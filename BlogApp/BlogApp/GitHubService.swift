import Foundation

enum GitHubServiceError: LocalizedError {
    case invalidURL
    case unauthorized
    case forbidden
    case notFound
    case conflict
    case server(Int, String?)
    case decoding
    case network(Error)

    var errorDescription: String? {
        switch self {
        case .invalidURL: return "Invalid API URL."
        case .unauthorized: return "Unauthorized. Check your token and repo access."
        case .forbidden: return "Forbidden. The token may lack repo scope."
        case .notFound: return "Repository or path not found."
        case .conflict: return "Could not update file (SHA mismatch). Try again."
        case .server(let code, let msg): return "GitHub error \(code): \(msg ?? "")"
        case .decoding: return "Could not parse GitHub response."
        case .network(let e): return e.localizedDescription
        }
    }
}

struct GitHubContentResponse: Decodable {
    let content: ContentFile?
    struct ContentFile: Decodable {
        let sha: String
    }
}

final class GitHubService {
    private let session: URLSession
    private let token: String

    init(token: String, session: URLSession = .shared) {
        self.token = token
        self.session = session
    }

    /// Encodes each path segment for use in GitHub REST URLs.
    private static func encodedRepoPath(_ path: String) -> String {
        path.split(separator: "/")
            .map { segment -> String in
                String(segment).addingPercentEncoding(withAllowedCharacters: .urlPathAllowed) ?? String(segment)
            }
            .joined(separator: "/")
    }

    private func request(url: URL, method: String, body: Data?) async throws -> (Data, HTTPURLResponse) {
        var req = URLRequest(url: url)
        req.httpMethod = method
        req.setValue("Bearer \(token)", forHTTPHeaderField: "Authorization")
        req.setValue("application/vnd.github+json", forHTTPHeaderField: "Accept")
        req.setValue("BlogApp-iOS/1.0", forHTTPHeaderField: "User-Agent")
        req.httpBody = body
        do {
            let (data, response) = try await session.data(for: req)
            guard let http = response as? HTTPURLResponse else { throw GitHubServiceError.invalidURL }
            return (data, http)
        } catch let e as GitHubServiceError {
            throw e
        } catch {
            throw GitHubServiceError.network(error)
        }
    }

    private func throwIfNeeded(status: Int, data: Data) throws {
        switch status {
        case 200...299: return
        case 401: throw GitHubServiceError.unauthorized
        case 403: throw GitHubServiceError.forbidden
        case 404: throw GitHubServiceError.notFound
        case 409: throw GitHubServiceError.conflict
        default:
            let msg = String(data: data, encoding: .utf8)
            throw GitHubServiceError.server(status, msg)
        }
    }

    /// Returns existing file SHA if the file exists, nil otherwise.
    func fileSHA(owner: String, repo: String, path: String, branch: String) async throws -> String? {
        let enc = Self.encodedRepoPath(path)
        var comps = URLComponents(string: "https://api.github.com/repos/\(owner)/\(repo)/contents/\(enc)")!
        comps.queryItems = [URLQueryItem(name: "ref", value: branch)]
        guard let url = comps.url else { throw GitHubServiceError.invalidURL }
        let (data, http) = try await request(url: url, method: "GET", body: nil)
        if http.statusCode == 404 { return nil }
        try throwIfNeeded(status: http.statusCode, data: data)
        let decoded = try? JSONDecoder().decode(GitHubContentResponse.self, from: data)
        return decoded?.content?.sha
    }

    /// Creates or updates a file at `path` (repo-relative). Content is raw UTF-8 (encoded Base64 by this method).
    func putFile(
        owner: String,
        repo: String,
        path: String,
        branch: String,
        message: String,
        content utf8: String,
        sha: String?
    ) async throws {
        let enc = Self.encodedRepoPath(path)
        guard let url = URL(string: "https://api.github.com/repos/\(owner)/\(repo)/contents/\(enc)") else {
            throw GitHubServiceError.invalidURL
        }
        let b64 = Data(utf8.utf8).base64EncodedString()
        var payload: [String: Any] = [
            "message": message,
            "content": b64,
            "branch": branch
        ]
        if let sha { payload["sha"] = sha }
        let body = try JSONSerialization.data(withJSONObject: payload)
        let (data, http) = try await request(url: url, method: "PUT", body: body)
        try throwIfNeeded(status: http.statusCode, data: data)
    }
}

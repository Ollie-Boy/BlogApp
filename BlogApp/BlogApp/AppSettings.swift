import Foundation
import SwiftUI

final class AppSettings: ObservableObject {
    @Published var githubOwner: String {
        didSet { UserDefaults.standard.set(githubOwner, forKey: Keys.owner) }
    }

    @Published var githubRepo: String {
        didSet { UserDefaults.standard.set(githubRepo, forKey: Keys.repo) }
    }

    @Published var postsPath: String {
        didSet { UserDefaults.standard.set(postsPath, forKey: Keys.postsPath) }
    }

    @Published var pagesSiteURL: String {
        didSet { UserDefaults.standard.set(pagesSiteURL, forKey: Keys.pagesURL) }
    }

    private enum Keys {
        static let owner = "githubOwner"
        static let repo = "githubRepo"
        static let postsPath = "postsPath"
        static let pagesURL = "pagesSiteURL"
    }

    init() {
        let d = UserDefaults.standard
        githubOwner = d.string(forKey: Keys.owner) ?? ""
        githubRepo = d.string(forKey: Keys.repo) ?? ""
        postsPath = d.string(forKey: Keys.postsPath) ?? "content/posts"
        pagesSiteURL = d.string(forKey: Keys.pagesURL) ?? ""
    }

    var personalAccessToken: String? {
        KeychainStore.readToken()
    }

    func saveToken(_ token: String) {
        KeychainStore.saveToken(token)
        objectWillChange.send()
    }

    func clearToken() {
        KeychainStore.deleteToken()
        objectWillChange.send()
    }

    var isConfigured: Bool {
        !githubOwner.isEmpty && !githubRepo.isEmpty && personalAccessToken != nil
    }
}

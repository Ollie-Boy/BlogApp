import SwiftUI

struct EditorPublishView: View {
    @EnvironmentObject private var settings: AppSettings
    @State private var markdown = "# Hello\n\nWrite your post in **Markdown**.\n"
    @State private var slug = "my-new-post"
    @State private var commitMessage = "Add post via BlogApp"
    @State private var branch = "main"
    @State private var previewMode = false
    @State private var isPublishing = false
    @State private var publishResult: String?
    @State private var publishError: String?

    private var previewHTML: String {
        MarkdownToHTML.convert(markdown)
    }

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                statusCard
                metaCard
                editorCard
                publishCard
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
        }
        .background(BlogTheme.background.ignoresSafeArea())
    }

    private var statusCard: some View {
        HStack(spacing: 12) {
            Image(systemName: settings.isConfigured ? "checkmark.circle.fill" : "exclamationmark.triangle.fill")
                .font(.title2)
                .foregroundStyle(settings.isConfigured ? BlogTheme.accent : Color.orange.opacity(0.85))
            VStack(alignment: .leading, spacing: 4) {
                Text(settings.isConfigured ? "Ready to publish" : "Finish setup")
                    .font(.headline)
                    .foregroundStyle(BlogTheme.titleText)
                Text(settings.isConfigured ? "Token and repo are set." : "Open the Settings tab and add owner, repo, and token.")
                    .font(.caption)
                    .foregroundStyle(BlogTheme.bodyText)
            }
            Spacer(minLength: 0)
        }
        .blogCard()
    }

    private var metaCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Text("Post file")
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(BlogTheme.titleText)
            HStack(spacing: 8) {
                Text((settings.postsPath).trimmingCharacters(in: CharacterSet(charactersIn: "/")))
                    .font(.caption.monospaced())
                    .foregroundStyle(BlogTheme.bodyText)
                Text("/")
                    .foregroundStyle(BlogTheme.bodyText.opacity(0.6))
                TextField("slug", text: $slug)
                    .textInputAutocapitalization(.never)
                    .autocorrectionDisabled()
                    .padding(10)
                    .background(BlogTheme.accentMuted)
                    .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                Text(".md")
                    .font(.caption.monospaced())
                    .foregroundStyle(BlogTheme.bodyText)
            }
            HStack(spacing: 12) {
                VStack(alignment: .leading, spacing: 6) {
                    Text("Branch")
                        .font(.caption.weight(.medium))
                        .foregroundStyle(BlogTheme.bodyText)
                    TextField("main", text: $branch)
                        .textInputAutocapitalization(.never)
                        .padding(10)
                        .background(BlogTheme.accentMuted)
                        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                }
                VStack(alignment: .leading, spacing: 6) {
                    Text("Commit message")
                        .font(.caption.weight(.medium))
                        .foregroundStyle(BlogTheme.bodyText)
                    TextField("message", text: $commitMessage)
                        .padding(10)
                        .background(BlogTheme.accentMuted)
                        .clipShape(RoundedRectangle(cornerRadius: 8, style: .continuous))
                }
            }
        }
        .blogCard()
    }

    private var editorCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            HStack {
                Text("Editor")
                    .font(.subheadline.weight(.semibold))
                    .foregroundStyle(BlogTheme.titleText)
                Spacer()
                Picker("", selection: $previewMode) {
                    Text("Markdown").tag(false)
                    Text("Preview").tag(true)
                }
                .pickerStyle(.segmented)
                .frame(maxWidth: 200)
            }
            if previewMode {
                MarkdownPreviewWebView(htmlString: previewHTML)
                    .frame(minHeight: 320)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            } else {
                TextEditor(text: $markdown)
                    .font(.body)
                    .foregroundStyle(BlogTheme.titleText)
                    .scrollContentBackground(.hidden)
                    .frame(minHeight: 320)
                    .padding(10)
                    .background(BlogTheme.accentMuted)
                    .clipShape(RoundedRectangle(cornerRadius: 12, style: .continuous))
            }
        }
        .blogCard()
    }

    private var publishCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            Button {
                Task { await publish() }
            } label: {
                HStack {
                    if isPublishing { ProgressView().tint(.white) }
                    Text(isPublishing ? "Publishing…" : "Publish to GitHub")
                        .font(.headline)
                }
                .frame(maxWidth: .infinity)
                .padding(.vertical, 14)
            }
            .buttonStyle(.borderedProminent)
            .tint(BlogTheme.accent)
            .disabled(!settings.isConfigured || isPublishing || sanitizedSlug.isEmpty)

            if let publishResult {
                Text(publishResult)
                    .font(.caption)
                    .foregroundStyle(BlogTheme.accent)
            }
            if let publishError {
                Text(publishError)
                    .font(.caption)
                    .foregroundStyle(.red.opacity(0.9))
            }
        }
        .blogCard()
    }

    private var sanitizedSlug: String {
        let s = slug.trimmingCharacters(in: .whitespacesAndNewlines)
            .replacingOccurrences(of: " ", with: "-")
            .lowercased()
        let allowed = CharacterSet.alphanumerics.union(CharacterSet(charactersIn: "-_"))
        return String(s.unicodeScalars.filter { allowed.contains($0) })
    }

    private var relativeFilePath: String {
        let base = settings.postsPath.trimmingCharacters(in: CharacterSet(charactersIn: "/"))
        return "\(base)/\(sanitizedSlug).md"
    }

    @MainActor
    private func publish() async {
        publishError = nil
        publishResult = nil
        guard let token = settings.personalAccessToken else {
            publishError = "No token saved."
            return
        }
        isPublishing = true
        defer { isPublishing = false }
        let owner = settings.githubOwner.trimmingCharacters(in: .whitespacesAndNewlines)
        let repo = settings.githubRepo.trimmingCharacters(in: .whitespacesAndNewlines)
        let br = branch.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty ? "main" : branch.trimmingCharacters(in: .whitespacesAndNewlines)
        let path = relativeFilePath
        let service = GitHubService(token: token)
        do {
            let sha = try await service.fileSHA(owner: owner, repo: repo, path: path, branch: br)
            try await service.putFile(
                owner: owner,
                repo: repo,
                path: path,
                branch: br,
                message: commitMessage.isEmpty ? "Update \(sanitizedSlug).md" : commitMessage,
                content: markdown,
                sha: sha
            )
            publishResult = sha == nil ? "Created \(path). Actions will run if configured." : "Updated \(path)."
        } catch let e as GitHubServiceError {
            publishError = e.localizedDescription
        } catch {
            publishError = error.localizedDescription
        }
    }
}

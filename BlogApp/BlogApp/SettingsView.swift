import SwiftUI

struct SettingsView: View {
    @EnvironmentObject private var settings: AppSettings
    @State private var tokenDraft = ""
    @State private var showToken = false

    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 20) {
                header

                Group {
                    labeledField("GitHub owner", text: $settings.githubOwner, prompt: "username or org")
                    labeledField("Repository", text: $settings.githubRepo, prompt: "repo-name")
                    labeledField("Posts folder", text: $settings.postsPath, prompt: "content/posts")
                    labeledField("Site URL (GitHub Pages)", text: $settings.pagesSiteURL, prompt: "https://username.github.io/repo/")
                }

                tokenCard

                tipsCard
            }
            .padding(.horizontal, 20)
            .padding(.vertical, 16)
        }
        .background(BlogTheme.background.ignoresSafeArea())
        .onAppear {
            tokenDraft = settings.personalAccessToken ?? ""
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 6) {
            Text("Settings")
                .font(.title2.weight(.semibold))
                .foregroundStyle(BlogTheme.titleText)
            Text("Connect your blog repo and personal access token.")
                .font(.subheadline)
                .foregroundStyle(BlogTheme.bodyText)
        }
        .frame(maxWidth: .infinity, alignment: .leading)
        .blogCard()
    }

    private func labeledField(_ title: String, text: Binding<String>, prompt: String) -> some View {
        VStack(alignment: .leading, spacing: 8) {
            Text(title)
                .font(.subheadline.weight(.medium))
                .foregroundStyle(BlogTheme.titleText)
            TextField(prompt, text: text)
                .textInputAutocapitalization(.never)
                .autocorrectionDisabled()
                .padding(12)
                .background(BlogTheme.accentMuted)
                .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))
        }
        .blogCard()
    }

    private var tokenCard: some View {
        VStack(alignment: .leading, spacing: 12) {
            HStack {
                Text("Personal Access Token")
                    .font(.subheadline.weight(.medium))
                    .foregroundStyle(BlogTheme.titleText)
                Spacer()
                if settings.personalAccessToken != nil {
                    Label("Saved", systemImage: "checkmark.circle.fill")
                        .font(.caption)
                        .foregroundStyle(BlogTheme.accent)
                }
            }
            Group {
                if showToken {
                    TextField("ghp_…", text: $tokenDraft)
                        .textContentType(.password)
                } else {
                    SecureField("ghp_…", text: $tokenDraft)
                        .textContentType(.password)
                }
            }
            .padding(12)
            .background(BlogTheme.accentMuted)
            .clipShape(RoundedRectangle(cornerRadius: 10, style: .continuous))

            Toggle("Show token while typing", isOn: $showToken)
                .font(.caption)
                .tint(BlogTheme.accent)

            HStack(spacing: 12) {
                Button {
                    settings.saveToken(tokenDraft.trimmingCharacters(in: .whitespacesAndNewlines))
                } label: {
                    Text("Save token")
                        .font(.subheadline.weight(.semibold))
                        .frame(maxWidth: .infinity)
                }
                .buttonStyle(.borderedProminent)
                .tint(BlogTheme.accent)

                Button(role: .destructive) {
                    settings.clearToken()
                    tokenDraft = ""
                } label: {
                    Text("Remove")
                        .font(.subheadline.weight(.medium))
                }
                .buttonStyle(.bordered)
            }
        }
        .blogCard()
    }

    private var tipsCard: some View {
        VStack(alignment: .leading, spacing: 10) {
            Text("How publishing works")
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(BlogTheme.titleText)
            Text("The app uses PUT /repos/{owner}/{repo}/contents/{path} to create or update a Markdown file under your posts folder. If your repo has a GitHub Actions workflow on push, the site rebuilds automatically.")
                .font(.caption)
                .foregroundStyle(BlogTheme.bodyText)
                .fixedSize(horizontal: false, vertical: true)
        }
        .blogCard()
    }
}

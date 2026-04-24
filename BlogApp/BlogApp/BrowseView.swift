import SwiftUI

struct BrowseView: View {
    @EnvironmentObject private var settings: AppSettings

    private var siteURL: URL? {
        let raw = settings.pagesSiteURL.trimmingCharacters(in: .whitespacesAndNewlines)
        guard !raw.isEmpty, let u = URL(string: raw) else { return nil }
        return u
    }

    var body: some View {
        VStack(alignment: .leading, spacing: 12) {
            VStack(alignment: .leading, spacing: 6) {
                Text("Your site")
                    .font(.title3.weight(.semibold))
                    .foregroundStyle(BlogTheme.titleText)
                Text("Loads the GitHub Pages URL from Settings.")
                    .font(.caption)
                    .foregroundStyle(BlogTheme.bodyText)
            }
            .frame(maxWidth: .infinity, alignment: .leading)
            .blogCard()
            .padding(.horizontal, 20)
            .padding(.top, 16)

            BlogWebView(url: siteURL)
                .frame(maxWidth: .infinity, maxHeight: .infinity)
                .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
                .padding(.horizontal, 20)
                .padding(.bottom, 16)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(BlogTheme.background.ignoresSafeArea())
    }
}

import SwiftUI

/// Cool light blue + white palette for card-based UI.
enum BlogTheme {
    static let background = Color(red: 0.91, green: 0.95, blue: 0.99)
    static let cardBackground = Color.white
    static let accent = Color(red: 0.35, green: 0.58, blue: 0.82)
    static let accentMuted = Color(red: 0.35, green: 0.58, blue: 0.82).opacity(0.15)
    static let titleText = Color(red: 0.12, green: 0.22, blue: 0.35)
    static let bodyText = Color(red: 0.25, green: 0.35, blue: 0.45)
    static let separator = Color(red: 0.85, green: 0.91, blue: 0.96)
}

struct CardStyle: ViewModifier {
    func body(content: Content) -> some View {
        content
            .padding(16)
            .background(BlogTheme.cardBackground)
            .clipShape(RoundedRectangle(cornerRadius: 16, style: .continuous))
            .shadow(color: Color.black.opacity(0.06), radius: 12, x: 0, y: 4)
            .shadow(color: BlogTheme.accent.opacity(0.08), radius: 8, x: 0, y: 2)
    }
}

extension View {
    func blogCard() -> some View {
        modifier(CardStyle())
    }
}

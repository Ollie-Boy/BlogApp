import SwiftUI

struct ContentView: View {
    var body: some View {
        TabView {
            EditorPublishView()
                .tabItem {
                    Label("Write", systemImage: "square.and.pencil")
                }
            BrowseView()
                .tabItem {
                    Label("Browse", systemImage: "safari")
                }
            SettingsView()
                .tabItem {
                    Label("Settings", systemImage: "gearshape")
                }
        }
        .tint(BlogTheme.accent)
    }
}

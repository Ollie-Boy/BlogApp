# BlogApp

SwiftUI iOS app: Markdown editor, publish posts to a GitHub repo via the Contents API (triggers Actions / Pages), and browse your site in a WebView.

## Open in Xcode

1. Clone this repository on a Mac with Xcode 15+.
2. Open `BlogApp/BlogApp.xcodeproj`.
3. Set your **Signing** team on the BlogApp target.
4. Add a GitHub **fine-grained** or **classic** personal access token with **Contents: Read and write** on your blog repository.

Configure **owner**, **repository**, **posts folder** (for example `content/posts`), **Pages URL**, and the token under the in-app **Settings** tab.

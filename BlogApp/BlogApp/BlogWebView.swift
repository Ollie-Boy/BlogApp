import SwiftUI
import UIKit
import WebKit

private let previewBackground = UIColor(red: 0.91, green: 0.95, blue: 0.99, alpha: 1)

struct BlogWebView: UIViewRepresentable {
    let url: URL?

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        let web = WKWebView(frame: .zero, configuration: config)
        web.isOpaque = false
        web.backgroundColor = previewBackground
        web.scrollView.backgroundColor = previewBackground
        return web
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        guard let url else {
            webView.loadHTMLString("<html><body style='font-family:-apple-system;padding:24px;color:#153a5c'>Set your site URL in Settings.</body></html>", baseURL: nil)
            return
        }
        let req = URLRequest(url: url)
        webView.load(req)
    }
}

struct MarkdownPreviewWebView: UIViewRepresentable {
    let htmlString: String

    func makeUIView(context: Context) -> WKWebView {
        let w = WKWebView(frame: .zero, configuration: WKWebViewConfiguration())
        w.isOpaque = false
        w.backgroundColor = previewBackground
        w.scrollView.backgroundColor = previewBackground
        return w
    }

    func updateUIView(_ webView: WKWebView, context: Context) {
        webView.loadHTMLString(htmlString, baseURL: nil)
    }
}

import Foundation

/// Lightweight Markdown → HTML for in-app preview (headings, paragraphs, fenced code, basic inline).
enum MarkdownToHTML {
    static func convert(_ markdown: String) -> String {
        let blocks = splitFencedCode(markdown)
        var parts: [String] = []
        for block in blocks {
            switch block {
            case .code(let lang, let body):
                let escaped = htmlEscape(body)
                let langAttr = lang.map { " class=\"language-\(htmlEscape($0))\"" } ?? ""
                parts.append("<pre><code\(langAttr)>\(escaped)</code></pre>")
            case .text(let t):
                parts.append(renderTextBlock(t))
            }
        }
        let bodyHTML = parts.joined()
        return """
        <!DOCTYPE html>
        <html><head>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <meta charset="utf-8"/>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                 padding: 16px; color: #1e3a5f; background: #f0f7fc; line-height: 1.55; }
          pre { background: #e8f2fa; padding: 12px; border-radius: 8px; overflow-x: auto; }
          code { font-size: 0.92em; }
          a { color: #5b93d1; }
          h1,h2,h3 { color: #153a5c; margin-top: 0.6em; margin-bottom: 0.35em; }
          p { margin: 0.4em 0; }
          ul { margin: 0.4em 0; padding-left: 1.2em; }
        </style>
        </head><body>\(bodyHTML)</body></html>
        """
    }

    private enum Block {
        case text(String)
        case code(lang: String?, body: String)
    }

    private static func splitFencedCode(_ md: String) -> [Block] {
        var result: [Block] = []
        var buffer = ""
        var lines = md.components(separatedBy: .newlines)
        var i = 0
        while i < lines.count {
            let line = lines[i]
            if line.hasPrefix("```") {
                if buffer.isEmpty == false {
                    result.append(.text(buffer))
                    buffer = ""
                }
                let fence = line.dropFirst(3)
                let lang = fence.trimmingCharacters(in: .whitespaces).isEmpty ? nil : String(fence.trimmingCharacters(in: .whitespaces))
                var codeLines: [String] = []
                i += 1
                while i < lines.count, !lines[i].hasPrefix("```") {
                    codeLines.append(lines[i])
                    i += 1
                }
                result.append(.code(lang: lang, body: codeLines.joined(separator: "\n")))
                if i < lines.count { i += 1 }
                continue
            }
            buffer += line + "\n"
            i += 1
        }
        if !buffer.isEmpty { result.append(.text(buffer)) }
        return result
    }

    private static func renderTextBlock(_ text: String) -> String {
        let paras = text.components(separatedBy: "\n\n")
        return paras.map { renderParagraphs($0) }.joined()
    }

    private static func renderParagraphs(_ chunk: String) -> String {
        let lines = chunk.split(separator: "\n", omittingEmptySubsequences: false).map(String.init)
        var out: [String] = []
        var listItems: [String] = []

        func flushList() {
            guard !listItems.isEmpty else { return }
            let inner = listItems.map { "<li>\(inlineMarkdown($0))</li>" }.joined()
            out.append("<ul>\(inner)</ul>")
            listItems = []
        }

        for raw in lines {
            let t = raw.trimmingCharacters(in: .whitespaces)
            if t.isEmpty {
                flushList()
                continue
            }
            if t.hasPrefix("### ") {
                flushList()
                out.append("<h3>\(inlineMarkdown(String(t.dropFirst(4))))</h3>")
            } else if t.hasPrefix("## ") {
                flushList()
                out.append("<h2>\(inlineMarkdown(String(t.dropFirst(3))))</h2>")
            } else if t.hasPrefix("# ") {
                flushList()
                out.append("<h1>\(inlineMarkdown(String(t.dropFirst(2))))</h1>")
            } else if t.hasPrefix("- ") || t.hasPrefix("* ") {
                listItems.append(String(t.dropFirst(2)))
            } else {
                flushList()
                out.append("<p>\(inlineMarkdown(t))</p>")
            }
        }
        flushList()
        return out.joined()
    }

    /// Inline: `code`, **bold**, [text](url)
    private static func inlineMarkdown(_ s: String) -> String {
        var result = ""
        var i = s.startIndex
        while i < s.endIndex {
            let ch = s[i]
            if ch == "`" {
                let after = s.index(after: i)
                if let end = s[after...].firstIndex(of: "`") {
                    let inner = String(s[after..<end])
                    result += "<code>\(htmlEscape(inner))</code>"
                    i = s.index(after: end)
                    continue
                }
            }
            if ch == "*", i < s.index(before: s.endIndex), s[s.index(after: i)] == "*" {
                let after = s.index(i, offsetBy: 2)
                if let endRange = s[after...].range(of: "**") {
                    let inner = String(s[after..<endRange.lowerBound])
                    result += "<strong>\(htmlEscape(inner))</strong>"
                    i = endRange.upperBound
                    continue
                }
            }
            if ch == "[" {
                if let closeBracket = s[i...].firstIndex(of: "]"),
                   closeBracket < s.endIndex,
                   s[s.index(after: closeBracket)] == "(",
                   let closeParen = s[s.index(after: closeBracket)...].firstIndex(of: ")") {
                    let linkText = String(s[s.index(after: i)..<closeBracket])
                    let openParen = s.index(after: closeBracket)
                    let urlStart = s.index(after: openParen)
                    let url = String(s[urlStart..<closeParen])
                    let href = attrEscape(url)
                    result += "<a href=\"\(href)\">\(htmlEscape(linkText))</a>"
                    i = s.index(after: closeParen)
                    continue
                }
            }
            result.append(htmlEscape(String(ch)))
            i = s.index(after: i)
        }
        return result
    }

    private static func htmlEscape(_ s: String) -> String {
        s.replacingOccurrences(of: "&", with: "&amp;")
            .replacingOccurrences(of: "<", with: "&lt;")
            .replacingOccurrences(of: ">", with: "&gt;")
            .replacingOccurrences(of: "\"", with: "&quot;")
    }

    private static func attrEscape(_ s: String) -> String {
        s.replacingOccurrences(of: "&", with: "&amp;")
            .replacingOccurrences(of: "\"", with: "&quot;")
            .replacingOccurrences(of: "'", with: "&#39;")
    }
}

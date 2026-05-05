#!/usr/bin/env python3
from pathlib import Path
import re
import sys
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "exampleSite" / "content" / "blog"
CONTENT = ROOT / "exampleSite" / "content"
STATIC = ROOT / "exampleSite" / "static"
ASSETS = ROOT / "exampleSite" / "assets"

REQUIRED = ["title", "date", "description"]
DATE_RE = re.compile(r"^\d{4}-\d{2}-\d{2}$")
MD_IMG_RE = re.compile(r"!\[[^\]]*\]\(([^)\s]+)")


def read_frontmatter(text: str) -> str:
    if text.startswith("---"):
        end = text.find("\n---", 3)
        return text[3:end] if end != -1 else ""
    if text.startswith("+++"):
        end = text.find("\n+++", 3)
        return text[3:end] if end != -1 else ""
    return ""


def has_key(frontmatter: str, key: str) -> bool:
    return re.search(rf"(?m)^\s*{re.escape(key)}\s*[:=]", frontmatter) is not None


def get_value(frontmatter: str, key: str) -> str | None:
    m = re.search(rf'(?m)^\s*{re.escape(key)}\s*[:=]\s*["\']?(.+?)["\']?\s*$', frontmatter)
    return m.group(1).strip() if m else None


def is_http_url(path: str) -> bool:
    p = urlparse(path)
    return p.scheme in {"http", "https"}


def exists_local_ref(path: str, md_file: Path) -> bool:
    normalized = path.split("?", 1)[0].split("#", 1)[0]
    if normalized.startswith("/"):
        rel = normalized.lstrip("/")
        return (STATIC / rel).exists() or (ASSETS / rel).exists() or (CONTENT / rel).exists()
    return (md_file.parent / normalized).exists()


def main() -> int:
    bad = []
    for md in BLOG.glob("*.md"):
        if md.name.startswith("_"):
            continue
        text = md.read_text(encoding="utf-8", errors="ignore")
        fm = read_frontmatter(text)
        missing = [k for k in REQUIRED if not has_key(fm, k)]
        if missing:
            bad.append((md, f"missing keys: {', '.join(missing)}"))
            continue

        date = get_value(fm, "date")
        if date and not DATE_RE.match(date):
            bad.append((md, f"invalid date format `{date}` (expect YYYY-MM-DD)"))

        image = get_value(fm, "image")
        if image and not is_http_url(image) and not exists_local_ref(image, md):
            bad.append((md, f"image not found: {image}"))

        for m in MD_IMG_RE.finditer(text):
            img = m.group(1).strip()
            if img.startswith(("#", "data:")) or is_http_url(img):
                continue
            if not exists_local_ref(img, md):
                bad.append((md, f"markdown image not found: {img}"))

    if bad:
        print("Content validation failed:")
        for path, reason in bad:
            print(f"- {path.relative_to(ROOT)}: {reason}")
        return 1

    print("Content validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

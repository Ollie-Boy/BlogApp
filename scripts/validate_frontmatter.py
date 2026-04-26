#!/usr/bin/env python3
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
BLOG = ROOT / "exampleSite" / "content" / "blog"

REQUIRED = ["title", "date", "description"]


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


def main() -> int:
    bad = []
    for md in BLOG.glob("*.md"):
      if md.name.startswith("_"):
          continue
      fm = read_frontmatter(md.read_text(encoding="utf-8", errors="ignore"))
      missing = [k for k in REQUIRED if not has_key(fm, k)]
      if missing:
          bad.append((md, missing))

    if bad:
        print("Front matter validation failed:")
        for path, miss in bad:
            print(f"- {path.relative_to(ROOT)} missing: {', '.join(miss)}")
        return 1

    print("Front matter validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())

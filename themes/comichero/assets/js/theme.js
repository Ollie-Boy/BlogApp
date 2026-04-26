(function () {
  var THEME_KEY = "comichero-theme";
  var SFX_MUTE_KEY = "comichero-sfx-muted";
  var root = document.documentElement;

  function getStored(key) {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function setStored(key, value) {
    try {
      localStorage.setItem(key, value);
    } catch (e) {}
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    root.classList.add("theme-transition");
    window.setTimeout(function () {
      root.classList.remove("theme-transition");
    }, 320);
  }

  function currentTheme() {
    return root.getAttribute("data-theme") === "dark" ? "dark" : "light";
  }

  function toggleTheme() {
    var next = currentTheme() === "dark" ? "light" : "dark";
    applyTheme(next);
    setStored(THEME_KEY, next);
  }

  document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
    btn.addEventListener("click", toggleTheme);
  });


  var nav = document.querySelector("[data-site-nav]");
  var navToggle = document.querySelector("[data-nav-toggle]");
  if (nav && navToggle) {
    navToggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function (e) {
    if (!getStored(THEME_KEY)) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  /* Back to top */
  var btt = document.querySelector("[data-back-to-top]");
  var footer = document.querySelector(".site-footer");

  function updateBttBottom() {
    if (!btt) return;
    var baseBottom = 20;
    if (!footer) {
      btt.style.bottom = baseBottom + "px";
      return;
    }
    var rect = footer.getBoundingClientRect();
    var overlap = window.innerHeight - rect.top;
    var lift = Math.max(0, overlap + 18);
    btt.style.bottom = Math.round(baseBottom + lift) + "px";
  }

  function docScrollHeight() {
    return Math.max(
      document.body.scrollHeight,
      document.documentElement.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.offsetHeight
    );
  }

  function toggleBtt() {
    if (!btt) return;
    var y = window.scrollY || document.documentElement.scrollTop;
    var show = docScrollHeight() > window.innerHeight + 4 && y > 160;
    btt.classList.toggle("is-visible", show);
    btt.setAttribute("aria-hidden", show ? "false" : "true");
    btt.tabIndex = show ? 0 : -1;
    updateBttBottom();
  }

  window.addEventListener("scroll", toggleBtt, { passive: true });
  window.addEventListener("resize", toggleBtt, { passive: true });
  window.addEventListener("load", toggleBtt);
  updateBttBottom();
  toggleBtt();

  if (btt) {
    btt.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Docs TOC reading progress */
  var docProgress = document.querySelector("[data-doc-progress]");
  var docMain = document.querySelector(".doc-main .article-content");
  function updateDocProgress() {
    if (!docProgress || !docMain) return;
    var rect = docMain.getBoundingClientRect();
    var total = Math.max(1, docMain.scrollHeight - window.innerHeight * 0.35);
    var consumed = Math.min(total, Math.max(0, -rect.top + 80));
    var pct = Math.max(0, Math.min(100, (consumed / total) * 100));
    docProgress.style.width = pct.toFixed(2) + "%";
  }
  window.addEventListener("scroll", updateDocProgress, { passive: true });
  window.addEventListener("resize", updateDocProgress, { passive: true });
  window.addEventListener("load", updateDocProgress);
  updateDocProgress();


  var prevIssue = document.querySelector("[data-prev-issue]");
  var nextIssue = document.querySelector("[data-next-issue]");
  if (prevIssue || nextIssue) {
    document.addEventListener("keydown", function (e) {
      var tag = e.target && e.target.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (e.target && e.target.isContentEditable)) return;
      if (e.key === "ArrowLeft" && prevIssue) window.location.href = prevIssue.getAttribute("href");
      if (e.key === "ArrowRight" && nextIssue) window.location.href = nextIssue.getAttribute("href");
    });
  }

  var article = document.querySelector("article[data-remember-position]");
  if (article && article.getAttribute("data-remember-position") !== "false") {
    var key = "comichero-pos:" + window.location.pathname;
    var restored = false;
    window.addEventListener("load", function () {
      var y = Number(getStored(key));
      if (!restored && isFinite(y) && y > 0) {
        restored = true;
        window.scrollTo(0, y);
      }
    });
    window.addEventListener("scroll", function () {
      setStored(key, String(Math.round(window.scrollY || document.documentElement.scrollTop || 0)));
    }, { passive: true });
  }


  var seriesProgress = document.querySelector("[data-series-progress]");
  if (seriesProgress) {
    var slug = seriesProgress.getAttribute("data-series-slug") || "";
    var current = Number(seriesProgress.getAttribute("data-series-current") || "0");
    var total = Number(seriesProgress.getAttribute("data-series-total") || "0");
    if (slug && total > 0) {
      var keyProgress = "comichero-series-progress:" + slug;
      var stored = Number(getStored(keyProgress) || "0");
      var read = Math.max(current, isFinite(stored) ? stored : 0);
      if (read > total) read = total;
      setStored(keyProgress, String(read));
      var readEl = seriesProgress.querySelector("[data-series-read]");
      var remainEl = seriesProgress.querySelector("[data-series-remaining]");
      if (readEl) readEl.textContent = String(read);
      if (remainEl) remainEl.textContent = String(Math.max(0, total - read));
    }
  }

  /* Before/after slider */
  document.querySelectorAll("[data-comic-compare]").forEach(function (wrap) {
    var range = wrap.querySelector("[data-compare-range]");
    var front = wrap.querySelector("[data-compare-front]");
    if (!range || !front) return;
    function setPct(v) {
      var n = Math.max(0, Math.min(100, Number(v)));
      front.style.clipPath = "inset(0 " + (100 - n) + "% 0 0)";
      range.setAttribute("aria-valuenow", String(n));
    }
    setPct(range.value);
    range.addEventListener("input", function () {
      setPct(range.value);
    });
  });

  /* Docs TOC active heading highlight */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll(".doc-toc a[href^='#']"));
  if (tocLinks.length) {
    var headingMap = [];
    tocLinks.forEach(function (a) {
      var id = decodeURIComponent((a.getAttribute("href") || "").slice(1));
      var target = id ? document.getElementById(id) : null;
      if (target) headingMap.push({ link: a, target: target });
    });
    function setActive(link) {
      tocLinks.forEach(function (a) { a.classList.remove("is-active"); });
      if (link) link.classList.add("is-active");
    }
    function updateActiveToc() {
      if (!headingMap.length) return;
      var marker = 130; /* offset for sticky header + breathing room */
      var candidate = headingMap[0];
      for (var i = 0; i < headingMap.length; i++) {
        var rect = headingMap[i].target.getBoundingClientRect();
        if (rect.top <= marker) {
          candidate = headingMap[i];
        } else {
          break;
        }
      }
      setActive(candidate.link);
    }
    window.addEventListener("scroll", updateActiveToc, { passive: true });
    window.addEventListener("resize", updateActiveToc, { passive: true });
    window.addEventListener("hashchange", function () {
      window.setTimeout(updateActiveToc, 0);
    });
    tocLinks.forEach(function (a) {
      a.addEventListener("click", function () {
        window.setTimeout(updateActiveToc, 0);
      });
    });
    updateActiveToc();
  }


  document.querySelectorAll(".prose pre").forEach(function (pre) {
    if (pre.closest(".codesnippet-wrap")) return;
    if (pre.querySelector(".code-copy-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy-btn";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy code block");
    pre.style.position = "relative";
    pre.appendChild(btn);
    btn.addEventListener("click", function () {
      var text = pre.textContent || "";
      function done() {
        btn.textContent = "Copied!";
        btn.classList.add("is-copied");
        btn.disabled = true;
        window.setTimeout(function () {
          btn.textContent = "Copy";
          btn.classList.remove("is-copied");
          btn.disabled = false;
        }, 1400);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      }
    });
  });

  /* Copy button for codesnippet */
  document.querySelectorAll("[data-copy-target]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var id = btn.getAttribute("data-copy-target");
      var el = id && document.getElementById(id);
      if (!el) return;
      var text = el.textContent || "";
      function done() {
        var prev = btn.textContent;
        btn.textContent = "Copied!";
        btn.classList.add("is-copied");
        btn.disabled = true;
        window.setTimeout(function () {
          btn.textContent = prev;
          btn.classList.remove("is-copied");
          btn.disabled = false;
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(function () {});
      } else {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.left = "-9999px";
        document.body.appendChild(ta);
        ta.select();
        try {
          document.execCommand("copy");
          done();
        } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  var tagSearch = document.querySelector("[data-tag-search]");
  if (tagSearch) {
    var tags = Array.prototype.slice.call(document.querySelectorAll(".tag-filter a.tag"));
    tagSearch.addEventListener("input", function () {
      var q = tagSearch.value.trim().toLowerCase();
      tags.forEach(function (t) {
        var show = !q || t.textContent.toLowerCase().indexOf(q) !== -1;
        t.style.display = show ? "" : "none";
      });
    });
  }

  /* Lightbox for content images */
  var lightbox = document.createElement("div");
  lightbox.className = "comic-lightbox";
  lightbox.innerHTML = '<button type="button" class="comic-lightbox__close" aria-label="Close">×</button><img alt="">';
  document.body.appendChild(lightbox);
  var lightboxImg = lightbox.querySelector("img");
  function closeLightbox() { lightbox.classList.remove("is-open"); }
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.classList.contains("comic-lightbox__close")) closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });

  /* Comic-style page enter transition */
  document.querySelectorAll("a[href]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var href = a.getAttribute("href") || "";
      if (!href || href.startsWith("#") || a.target === "_blank" || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      var sameOrigin = href.startsWith("/") || href.indexOf(window.location.origin) === 0;
      if (!sameOrigin) return;
      document.body.classList.add("page-entering");
    });
  });
  document.querySelectorAll(".article-content img, .prose img").forEach(function (img) {
    img.addEventListener("click", function () {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || "";
      lightbox.classList.add("is-open");
    });
  });

  /* Keyboard shortcuts: j/k next-prev post, / focus search/filter */
  document.addEventListener("keydown", function (e) {
    var tag = e.target && e.target.tagName;
    if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT" || (e.target && e.target.isContentEditable)) return;
    if (e.key === "j" || e.key === "J") {
      var next = document.querySelector("[data-next-issue], .article-nav__link--next");
      if (next) { window.location.href = next.getAttribute("href"); }
    }
    if (e.key === "k" || e.key === "K") {
      var prev = document.querySelector("[data-prev-issue], .article-nav__link--prev");
      if (prev) { window.location.href = prev.getAttribute("href"); }
    }
    if (e.key === "/") {
      var filter = document.querySelector("[data-tag-search]");
      if (filter) {
        e.preventDefault();
        filter.focus();
      }
    }
  });

  /* Soundboard */
  var audioCtx = null;
  function getCtx() {
    if (!audioCtx) {
      try {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      } catch (e) {
        return null;
      }
    }
    return audioCtx;
  }

  function playBeep(freq) {
    if (getStored(SFX_MUTE_KEY) === "1") return;
    var ctx = getCtx();
    if (!ctx) return;
    if (ctx.state === "suspended") ctx.resume();
    var f = parseFloat(String(freq), 10);
    if (isNaN(f)) f = 880;
    var o = ctx.createOscillator();
    var g = ctx.createGain();
    o.type = "square";
    o.frequency.value = f;
    g.gain.setValueAtTime(0.08, ctx.currentTime);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.08);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.stop(ctx.currentTime + 0.09);
  }

  document.querySelectorAll("[data-soundboard]").forEach(function (board) {
    var first = board.querySelector("[data-sfx-btn]");
    var pressTimer = null;
    board.querySelectorAll("[data-sfx-btn]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        if (pressTimer) {
          clearTimeout(pressTimer);
          pressTimer = null;
        }
        playBeep(btn.getAttribute("data-freq") || "880");
      });
      if (btn === first) {
        btn.addEventListener("pointerdown", function () {
          pressTimer = window.setTimeout(function () {
            pressTimer = null;
            var muted = getStored(SFX_MUTE_KEY) === "1";
            setStored(SFX_MUTE_KEY, muted ? "0" : "1");
            btn.setAttribute("aria-pressed", muted ? "false" : "true");
            board.setAttribute("data-sfx-muted", muted ? "0" : "1");
          }, 550);
        });
        btn.addEventListener("pointerup", function () {
          if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
        });
        btn.addEventListener("pointerleave", function () {
          if (pressTimer) {
            clearTimeout(pressTimer);
            pressTimer = null;
          }
        });
      }
    });
    if (getStored(SFX_MUTE_KEY) === "1") board.setAttribute("data-sfx-muted", "1");
  });
})();

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

  function updateThemeToggleLabels() {
    var theme = currentTheme();
    document.querySelectorAll("[data-theme-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-label", "Theme: " + theme + ". Click to switch.");
      btn.setAttribute("title", "Theme: " + theme);
    });
  }

  function toggleTheme() {
    var next = currentTheme() === "light" ? "dark" : "light";
    applyTheme(next);
    setStored(THEME_KEY, next);
    updateThemeToggleLabels();
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

  updateThemeToggleLabels();

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
      if (
        tag === "INPUT" ||
        tag === "TEXTAREA" ||
        tag === "SELECT" ||
        (e.target && e.target.isContentEditable)
      )
        return;
      if (e.key === "ArrowLeft" && prevIssue) window.location.href = prevIssue.getAttribute("href");
      if (e.key === "ArrowRight" && nextIssue)
        window.location.href = nextIssue.getAttribute("href");
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
    window.addEventListener(
      "scroll",
      function () {
        setStored(
          key,
          String(Math.round(window.scrollY || document.documentElement.scrollTop || 0))
        );
      },
      { passive: true }
    );
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
    var tocWrap = document.querySelector(".doc-toc");
    function setActive(link) {
      tocLinks.forEach(function (a) {
        a.classList.remove("is-active");
      });
      if (!link) return;
      link.classList.add("is-active");
      if (tocWrap) {
        var top = link.offsetTop - tocWrap.clientHeight * 0.35;
        tocWrap.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
      }
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

  document.querySelectorAll("[data-toc-toggle]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var box = btn.closest("[data-comic-toc]");
      if (!box) return;
      var collapsed = box.classList.toggle("is-collapsed");
      btn.setAttribute("aria-expanded", collapsed ? "false" : "true");
    });
  });

  document.querySelectorAll(".hero__sfx").forEach(function (sfx) {
    sfx.addEventListener("mousedown", function (e) {
      e.preventDefault();
    });
    sfx.addEventListener("click", function () {
      sfx.classList.remove("is-bursting");
      void sfx.offsetWidth;
      sfx.classList.add("is-bursting");
    });
  });

  function ensureCodeActions(container, className) {
    var actions = container.querySelector(":scope > ." + className);
    if (!actions) {
      actions = document.createElement("div");
      actions.className = className;
      container.appendChild(actions);
    }
    return actions;
  }

  document.querySelectorAll(".prose pre").forEach(function (pre) {
    if (pre.closest(".comic-aside")) return;
    if (pre.closest(".codesnippet-wrap")) return;
    if (pre.querySelector(".code-copy-btn")) return;
    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "code-copy-btn";
    btn.textContent = "Copy";
    btn.setAttribute("aria-label", "Copy code block");
    pre.style.position = "relative";
    ensureCodeActions(pre, "code-actions").appendChild(btn);
    btn.addEventListener("click", function () {
      var code = pre.querySelector("code");
      var text = (code && code.textContent) || pre.textContent || "";
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
        navigator.clipboard
          .writeText(text)
          .then(done)
          .catch(function () {});
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
        navigator.clipboard
          .writeText(text)
          .then(done)
          .catch(function () {});
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

  /* Lightbox for content images */
  var lightbox = document.createElement("div");
  lightbox.className = "comic-lightbox";
  lightbox.innerHTML =
    '<button type="button" class="comic-lightbox__close" aria-label="Close">×</button><a class="comic-lightbox__download" download>Download</a><img alt=""><p class="comic-lightbox__caption"></p><div class="comic-lightbox__thumbs" aria-label="Image thumbnails"></div>';
  document.body.appendChild(lightbox);
  var lightboxImg = lightbox.querySelector("img");
  var lightboxCaption = lightbox.querySelector(".comic-lightbox__caption");
  var lightboxDownload = lightbox.querySelector(".comic-lightbox__download");
  var lightboxThumbs = lightbox.querySelector(".comic-lightbox__thumbs");
  function closeLightbox() {
    lightbox.classList.remove("is-open");
  }
  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox || e.target.classList.contains("comic-lightbox__close"))
      closeLightbox();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && lightbox.classList.contains("is-open")) closeLightbox();
  });

  document.querySelectorAll(".article-content img, .prose img").forEach(function (img) {
    img.addEventListener("click", function () {
      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || "";
      if (lightboxCaption)
        lightboxCaption.textContent =
          img.closest("figure")?.querySelector("figcaption")?.textContent || img.alt || "";
      if (lightboxDownload) lightboxDownload.href = lightboxImg.src;
      lightbox.classList.add("is-open");
    });
  });

  /* Keyboard shortcuts: j/k next-prev post, / open search */
  document.addEventListener("keydown", function (e) {
    var tag = e.target && e.target.tagName;
    if (
      tag === "INPUT" ||
      tag === "TEXTAREA" ||
      tag === "SELECT" ||
      (e.target && e.target.isContentEditable)
    )
      return;
    if (e.key === "j" || e.key === "J") {
      var next = document.querySelector("[data-next-issue], .article-nav__link--next");
      if (next) {
        window.location.href = next.getAttribute("href");
      }
    }
    if (e.key === "k" || e.key === "K") {
      var prev = document.querySelector("[data-prev-issue], .article-nav__link--prev");
      if (prev) {
        window.location.href = prev.getAttribute("href");
      }
    }
    if (e.key === "/") {
      e.preventDefault();
      var query = "";
      var active = document.activeElement;
      if (active && active.tagName === "INPUT" && active.type === "search") {
        query = (active.value || "").trim();
      }
      var target = "/search/";
      if (query) target += "?q=" + encodeURIComponent(query);
      window.location.href = target;
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

  /* Global media mute memory */
  var MEDIA_MUTE_KEY = "comichero-media-muted";
  var mediaMuted = getStored(MEDIA_MUTE_KEY) === "1";
  document.querySelectorAll("audio,video").forEach(function (m) {
    m.muted = mediaMuted;
    m.addEventListener("volumechange", function () {
      setStored(MEDIA_MUTE_KEY, m.muted ? "1" : "0");
    });
  });

  /* Enhanced code blocks */
  var toast = document.createElement("div");
  toast.className = "code-toast";
  document.body.appendChild(toast);
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-show");
    window.clearTimeout(showToast._t);
    showToast._t = window.setTimeout(function () {
      toast.classList.remove("is-show");
    }, 1200);
  }

  document.querySelectorAll(".prose pre code, .codesnippet code").forEach(function (code) {
    var pre = code.closest("pre");
    if (!pre) return;
    if (pre.closest(".comic-aside")) return;
    pre.classList.add("code-enhanced");
    var langClass = Array.prototype.find.call(code.classList, function (cn) {
      return cn.indexOf("language-") === 0;
    });
    if (langClass)
      pre.setAttribute("data-code-lang", langClass.replace(/^language-/, "").toUpperCase());
    var wrap = pre.closest(".codesnippet-wrap");
    var copyBtn = wrap && pre.id ? wrap.querySelector('[data-copy-target="' + pre.id + '"]') : null;
    if (copyBtn) ensureCodeActions(wrap, "codesnippet-actions").appendChild(copyBtn);

    var lines = (code.textContent || "").split("\n").length;
    if (
      lines > 20 &&
      !pre.querySelector(".code-collapse-btn") &&
      !(wrap && wrap.querySelector(".code-collapse-btn"))
    ) {
      pre.classList.add("is-collapsed");
      var toggle = document.createElement("button");
      toggle.type = "button";
      toggle.className = "code-collapse-btn";
      toggle.textContent = "Expand";
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Expand code block");
      var actions = wrap
        ? ensureCodeActions(wrap, "codesnippet-actions")
        : ensureCodeActions(pre, "code-actions");
      actions.insertBefore(toggle, actions.firstChild);
      toggle.addEventListener("click", function () {
        var collapsed = pre.classList.toggle("is-collapsed");
        toggle.textContent = collapsed ? "Expand" : "Collapse";
        toggle.setAttribute("aria-expanded", collapsed ? "false" : "true");
        toggle.setAttribute("aria-label", collapsed ? "Expand code block" : "Collapse code block");
      });
    }
  });

  document.querySelectorAll(".code-copy-btn,[data-copy-target]").forEach(function (b) {
    b.addEventListener("click", function () {
      window.setTimeout(function () {
        showToast("Copied");
      }, 30);
    });
  });

  /* dialogue-ab choice feedback */
  document.querySelectorAll("[data-dialogue-ab]").forEach(function (box) {
    var buttons = box.querySelectorAll("[data-pick],[data-vote-option]");
    var result = box.querySelector("[data-vote-result]");
    if (!buttons.length || !result) return;
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var pick = btn.getAttribute("data-pick") || btn.getAttribute("data-vote-option") || "";
        var label = btn
          .closest(".comic-dialogue-ab__panel")
          ?.querySelector(".comic-dialogue-ab__label");
        var txt = (label && label.textContent) || btn.textContent || pick;
        result.textContent = "You chose: " + txt.trim();
        result.classList.add("is-active");
        buttons.forEach(function (b) {
          b.classList.toggle("is-active", b === btn);
        });
      });
    });
  });

  document.querySelectorAll("[data-showcase-tools]").forEach(function (tools) {
    var filter = tools.querySelector("[data-showcase-filter]");
    var editor = tools.querySelector("[data-showcase-editor]");
    var preview = tools.querySelector("[data-showcase-preview]");
    var article = tools.closest(".article-content") || document.querySelector(".article-content");
    var sections = article
      ? Array.prototype.slice.call(article.querySelectorAll("h2, h3")).map(function (heading) {
          var nodes = [];
          var node = heading.nextElementSibling;
          while (node && !/^H[23]$/.test(node.tagName)) {
            nodes.push(node);
            node = node.nextElementSibling;
          }
          return { heading: heading, nodes: nodes };
        })
      : [];
    function updatePreview() {
      if (preview && editor) preview.textContent = editor.value;
    }
    function runFilter() {
      var q = filter ? filter.value.trim().toLowerCase() : "";
      sections.forEach(function (section) {
        var haystack = [section.heading.textContent]
          .concat(
            section.nodes.map(function (node) {
              return node.textContent || "";
            })
          )
          .join(" ")
          .toLowerCase();
        var show = !q || haystack.indexOf(q) !== -1;
        section.heading.hidden = !show;
        section.nodes.forEach(function (node) {
          node.hidden = !show;
        });
      });
    }
    if (filter) filter.addEventListener("input", runFilter);
    if (editor) editor.addEventListener("input", updatePreview);
    updatePreview();
  });

  /* Lightbox keyboard gallery */
  var lightboxImgs = Array.prototype.slice.call(
    document.querySelectorAll(".article-content img, .prose img")
  );
  if (lightboxThumbs) {
    lightboxImgs.forEach(function (img, i) {
      var thumb = document.createElement("button");
      thumb.type = "button";
      thumb.className = "comic-lightbox__thumb";
      thumb.style.backgroundImage = "url('" + (img.currentSrc || img.src) + "')";
      thumb.setAttribute("aria-label", "Open image " + String(i + 1));
      thumb.addEventListener("click", function () {
        openLightboxAt(i);
      });
      lightboxThumbs.appendChild(thumb);
    });
  }
  var lightboxIndex = -1;
  function openLightboxAt(i) {
    if (!lightboxImgs[i]) return;
    lightboxIndex = i;
    lightboxImg.src = lightboxImgs[i].currentSrc || lightboxImgs[i].src;
    lightboxImg.alt = lightboxImgs[i].alt || "";
    if (lightboxCaption)
      lightboxCaption.textContent =
        lightboxImgs[i].closest("figure")?.querySelector("figcaption")?.textContent ||
        lightboxImgs[i].alt ||
        "";
    if (lightboxDownload) lightboxDownload.href = lightboxImg.src;
    if (lightboxThumbs) {
      Array.prototype.forEach.call(lightboxThumbs.children, function (thumb, index) {
        thumb.classList.toggle("is-active", index === i);
      });
    }
    lightbox.classList.add("is-open");
  }
  lightboxImgs.forEach(function (img, i) {
    img.addEventListener("click", function () {
      openLightboxAt(i);
    });
  });
  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "ArrowLeft" && lightboxImgs.length)
      openLightboxAt((lightboxIndex - 1 + lightboxImgs.length) % lightboxImgs.length);
    if (e.key === "ArrowRight" && lightboxImgs.length)
      openLightboxAt((lightboxIndex + 1) % lightboxImgs.length);
  });

  /* background reacts to mouse + scroll progress */
  var bgX = 0.5;
  var bgY = 0;
  var targetX = 0.5;
  var targetY = 0;
  var lastScrollY = window.scrollY || 0;
  var lastScrollAt = performance.now();
  var scrollVelocity = 0;
  var rafId = 0;
  var fxParams = new URLSearchParams(window.location.search);
  var fxOff = fxParams.get("fx") === "off" || getStored("comichero-fx") === "off";
  var bgIntensity = Math.max(
    0.35,
    Math.min(1.6, Number(getStored("comichero-bg-intensity") || "1"))
  );
  if (fxOff) root.setAttribute("data-fx", "off");

  function paletteForProgress(progress, isDark) {
    if (progress < 0.33) {
      return isDark ? [218, 252, 286] : [198, 230, 264];
    }
    if (progress < 0.66) {
      return isDark ? [256, 292, 330] : [242, 278, 316];
    }
    return isDark ? [182, 224, 266] : [30, 72, 112];
  }

  function scheduleBg() {
    if (rafId) return;
    rafId = requestAnimationFrame(function () {
      rafId = 0;
      bgX += (targetX - bgX) * 0.16;
      bgY += (targetY - bgY) * 0.12;
      var progress = Math.min(1, Math.max(0, bgY));
      var isDark = root.getAttribute("data-theme") === "dark";
      var base = paletteForProgress(progress, isDark);
      var cycle = progress * 120;
      var wave = Math.sin(progress * Math.PI * 4);
      var velocityBoost = fxOff ? 0 : Math.min(0.2, scrollVelocity * 0.0009) * bgIntensity;

      root.style.setProperty("--bg-x", String((bgX * 100).toFixed(2)) + "%");
      root.style.setProperty("--bg-y", String((bgY * 100).toFixed(2)) + "%");
      root.style.setProperty("--bg-hue-1", String((base[0] + cycle * bgIntensity).toFixed(1)));
      root.style.setProperty(
        "--bg-hue-2",
        String((base[1] + cycle * 0.9 * bgIntensity).toFixed(1))
      );
      root.style.setProperty(
        "--bg-hue-3",
        String((base[2] + cycle * 0.78 * bgIntensity).toFixed(1))
      );
      root.style.setProperty(
        "--bg-glow-alpha",
        String((0.18 + (wave + 1) * 0.11 * bgIntensity + velocityBoost).toFixed(3))
      );
      root.style.setProperty("--bg-stop-1", isDark ? "24%" : "84%");
      root.style.setProperty("--bg-stop-2", isDark ? "20%" : "74%");
      root.style.setProperty("--bg-stop-3", isDark ? "16%" : "66%");
    });
  }

  function updateBg(e) {
    targetX = e ? e.clientX / Math.max(1, window.innerWidth) : targetX;
    targetY = (window.scrollY || 0) / Math.max(1, document.body.scrollHeight - window.innerHeight);
    scheduleBg();
  }

  window.addEventListener("mousemove", updateBg, { passive: true });
  window.addEventListener(
    "scroll",
    function () {
      var now = performance.now();
      var currentY = window.scrollY || 0;
      var dt = Math.max(1, now - lastScrollAt);
      var direction = currentY > lastScrollY ? "down" : "up";
      scrollVelocity = (Math.abs(currentY - lastScrollY) / dt) * 1000;
      root.setAttribute("data-scroll-direction", direction);
      lastScrollY = currentY;
      lastScrollAt = now;
      var bttBtn = document.querySelector("[data-back-to-top]");
      if (bttBtn && scrollVelocity > 1100) {
        bttBtn.classList.remove("is-speeding");
        void bttBtn.offsetWidth;
        bttBtn.classList.add("is-speeding");
      }
      updateBg();
    },
    { passive: true }
  );
  updateBg();

  var bgmAudio = document.querySelector("[data-bgm-audio]");
  var bgmBtn = document.querySelector("[data-bgm-toggle]");
  var rawLyrics = document.querySelector("[data-bgm-lyrics-raw]");
  var lyricList = document.querySelector("[data-bgm-lyrics]");
  if (bgmAudio && bgmBtn) {
    var BGM_KEY = "comichero-bgm-on";
    var parsed = [];
    if (rawLyrics && lyricList) {
      var lines = (rawLyrics.textContent || "").split("\n");
      lines.forEach(function (line) {
        var m = line.match(/^\s*\[(\d{1,2}):(\d{2})(?:\.(\d{1,2}))?\]\s*(.*)$/);
        if (!m) return;
        var t = Number(m[1]) * 60 + Number(m[2]) + (m[3] ? Number(m[3]) / 100 : 0);
        parsed.push({ time: t, text: m[4] || "…" });
      });
      parsed.sort(function (a, b) { return a.time - b.time; });
      parsed.forEach(function (row) { var li = document.createElement("li"); li.textContent = row.text; lyricList.appendChild(li); });
      rawLyrics.hidden = true;
    }
    function syncBtn() { bgmBtn.textContent = bgmAudio.paused ? "Play" : "Pause"; }
    bgmBtn.addEventListener("click", function () { if (bgmAudio.paused) bgmAudio.play().catch(function () {}); else bgmAudio.pause(); });
    bgmAudio.addEventListener("play", function () { setStored(BGM_KEY, "1"); syncBtn(); });
    bgmAudio.addEventListener("pause", syncBtn);
    bgmAudio.addEventListener("timeupdate", function () {
      if (!parsed.length || !lyricList) return;
      var idx = 0;
      for (var i = 0; i < parsed.length; i++) if (bgmAudio.currentTime >= parsed[i].time) idx = i;
      Array.prototype.forEach.call(lyricList.children, function (el, i) { el.classList.toggle("is-active", i === idx); });
    });
    if (getStored(BGM_KEY) === "1") bgmAudio.autoplay = true;
    syncBtn();
  }

})();

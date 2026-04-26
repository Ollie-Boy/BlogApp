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

  /* Back to top + speed-line overlay */
  var btt = document.querySelector("[data-back-to-top]");
  var zap = document.querySelector("[data-scroll-zap-overlay]");
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
  function pageCanScroll() {
    return docScrollHeight() > window.innerHeight + 4;
  }
  function updateScrollZap() {
    if (!zap) return;
    var maxScroll = docScrollHeight() - window.innerHeight;
    if (maxScroll <= 0) {
      zap.classList.remove("is-tracking");
      zap.hidden = true;
      return;
    }
    var y = window.scrollY || document.documentElement.scrollTop;
    var progress = Math.max(0, Math.min(1, y / maxScroll));
    var lengthFactor = Math.max(0.8, Math.min(2.4, maxScroll / 1100));
    var energy = 0.22 + progress * 0.78;
    var glow = Math.min(1, 0.2 + (maxScroll / 6000) * 0.55 + progress * 0.35);
    var drift = Math.sin((y / Math.max(420, window.innerHeight)) * Math.PI * 2) * 7;

    zap.style.setProperty("--scroll-progress", progress.toFixed(3));
    zap.style.setProperty("--zap-length", lengthFactor.toFixed(3));
    zap.style.setProperty("--zap-energy", energy.toFixed(3));
    zap.style.setProperty("--zap-glow", glow.toFixed(3));
    zap.style.setProperty("--zap-drift", drift.toFixed(2) + "%");
    zap.hidden = false;
    zap.classList.add("is-tracking");
  }
  function toggleBtt() {
    if (!btt) return;
    var y = window.scrollY || document.documentElement.scrollTop;
    var show = pageCanScroll() && y > 160;
    btt.classList.toggle("is-visible", show);
    btt.setAttribute("aria-hidden", show ? "false" : "true");
    btt.tabIndex = show ? 0 : -1;
    updateBttBottom();
    updateScrollZap();
  }
  window.addEventListener("scroll", toggleBtt, { passive: true });
  window.addEventListener("resize", toggleBtt, { passive: true });
  window.addEventListener("load", toggleBtt);
  updateBttBottom();
  updateScrollZap();
  toggleBtt();

  if (btt) {
    btt.addEventListener("click", function () {
      if (zap) {
        var main = document.getElementById("main");
        var anchor = (main && main.querySelector(".article-content")) || main;
        var xPct = 50;
        var yPct = 62;
        if (anchor && typeof anchor.getBoundingClientRect === "function") {
          var r = anchor.getBoundingClientRect();
          var cx = r.left + r.width / 2;
          var cy = r.top + Math.min(r.height * 0.55, window.innerHeight * 0.72);
          xPct = Math.round((cx / window.innerWidth) * 1000) / 10;
          yPct = Math.round((cy / window.innerHeight) * 1000) / 10;
          xPct = Math.max(12, Math.min(88, xPct));
          yPct = Math.max(28, Math.min(88, yPct));
        }
        zap.style.setProperty("--zap-x", xPct + "%");
        zap.style.setProperty("--zap-y", yPct + "%");
        zap.hidden = false;
        zap.classList.add("is-active");
        window.setTimeout(function () {
          zap.classList.remove("is-active");
          if (!zap.classList.contains("is-tracking")) zap.hidden = true;
        }, 580);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
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
        btn.disabled = true;
        window.setTimeout(function () {
          btn.textContent = prev;
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

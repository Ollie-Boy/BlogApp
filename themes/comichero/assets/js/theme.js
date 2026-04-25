(function () {
  var THEME_KEY = "comichero-theme";
  var MOTION_KEY = "comichero-motion";
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

  function applyMotion(on) {
    root.setAttribute("data-motion", on ? "on" : "off");
    setStored(MOTION_KEY, on ? "on" : "off");
    document.querySelectorAll("[data-motion-toggle]").forEach(function (btn) {
      btn.setAttribute("aria-pressed", on ? "true" : "false");
    });
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

  var motionBtn = document.querySelector("[data-motion-toggle]");
  if (motionBtn) {
    var m = getStored(MOTION_KEY);
    if (m === "off") applyMotion(false);
    else applyMotion(true);
    motionBtn.addEventListener("click", function () {
      var on = root.getAttribute("data-motion") !== "off";
      applyMotion(!on);
    });
  }

  /* Reading progress */
  var bar = document.querySelector("[data-read-progress]");
  function updateReadProgress() {
    if (!bar) return;
    var main = document.getElementById("main");
    if (!main) return;
    var el = main.querySelector(".article-content") || main;
    var rect = el.getBoundingClientRect();
    var total = el.scrollHeight - window.innerHeight;
    if (total <= 0) {
      bar.style.width = "100%";
      return;
    }
    var y = window.scrollY || document.documentElement.scrollTop;
    var start = rect.top + y;
    var p = (y - start + window.innerHeight * 0.2) / (el.scrollHeight + window.innerHeight * 0.2);
    p = Math.max(0, Math.min(1, p));
    bar.style.width = p * 100 + "%";
  }
  window.addEventListener("scroll", updateReadProgress, { passive: true });
  window.addEventListener("resize", updateReadProgress);
  updateReadProgress();

  /* Back to top + lightning stripe overlay */
  var btt = document.querySelector("[data-back-to-top]");
  var zap = document.querySelector("[data-scroll-zap-overlay]");
  function toggleBtt() {
    if (!btt) return;
    var show = (window.scrollY || document.documentElement.scrollTop) > 380;
    btt.hidden = !show;
  }
  window.addEventListener("scroll", toggleBtt, { passive: true });
  toggleBtt();

  if (btt) {
    btt.addEventListener("click", function () {
      var motionOn = root.getAttribute("data-motion") !== "off";
      if (motionOn && zap) {
        zap.hidden = false;
        zap.classList.add("is-active");
        window.setTimeout(function () {
          zap.classList.remove("is-active");
          zap.hidden = true;
        }, 700);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* Before/after slider — clip-path on front image */
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

  /* Soundboard — Web Audio beep; long-press first button toggles mute */
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

(function () {
  var STORAGE_KEY = "comichero-theme";
  var root = document.documentElement;

  function getStored() {
    try {
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStored(value) {
    try {
      localStorage.setItem(STORAGE_KEY, value);
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
    setStored(next);
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
    if (!getStored()) {
      applyTheme(e.matches ? "dark" : "light");
    }
  });

  /* Before/after slider — clip-path on front image */
  document.querySelectorAll("[data-comic-compare]").forEach(function (wrap) {
    var range = wrap.querySelector("[data-compare-range]");
    var front = wrap.querySelector("[data-compare-front]");
    if (!range || !front) return;
    function setPct(v) {
      var n = Math.max(0, Math.min(100, Number(v)));
      var p = n + "%";
      front.style.setProperty("--compare-pct", p);
      front.style.clipPath = "inset(0 calc(100% - " + p + ") 0 0)";
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
})();

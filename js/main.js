(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.add("js");

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Relógio ao vivo (São Paulo) ---------- */
  var relogio = document.getElementById("relogio");
  if (relogio) {
    var fmt = new Intl.DateTimeFormat("pt-BR", {
      timeZone: "America/Sao_Paulo", hour: "2-digit", minute: "2-digit", hour12: false
    });
    var tick = function () {
      relogio.textContent = fmt.format(new Date());
    };
    tick();
    setInterval(tick, 10000);
  }

  /* ---------- Menu móvel ---------- */
  var btn = document.getElementById("menu-btn");
  var painel = document.getElementById("menu-painel");

  function setMenu(open) {
    if (!btn || !painel) return;
    btn.setAttribute("aria-expanded", String(open));
    btn.textContent = open ? "Fechar" : "Menu";
    painel.hidden = !open;
    document.body.classList.toggle("menu-open", open);
  }
  if (btn && painel) {
    btn.addEventListener("click", function () {
      setMenu(btn.getAttribute("aria-expanded") !== "true");
    });
    painel.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && btn.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        btn.focus();
      }
    });
    window.matchMedia("(min-width: 1100px)").addEventListener("change", function (e) {
      if (e.matches) setMenu(false);
    });
  }

  /* ---------- Aparecer ao rolar (uma vez) ---------- */
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -6% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }

  /* ---------- Link ativo conforme a seção visível ---------- */
  var ids = ["projetos", "sobre", "skills", "trajetoria", "contato"];
  var links = document.querySelectorAll(".nav-desktop a, .menu-panel a");

  function marcar(id) {
    links.forEach(function (a) {
      if (a.getAttribute("href") === "#" + id) a.setAttribute("aria-current", "true");
      else a.removeAttribute("aria-current");
    });
  }

  if ("IntersectionObserver" in window) {
    var visiveis = {};
    var so = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { visiveis[entry.target.id] = entry.isIntersecting; });
      var atual = null;
      ids.forEach(function (id) { if (visiveis[id]) atual = id; });
      if (atual) marcar(atual);
      else if (window.scrollY < 200) marcar("");
    }, { rootMargin: "-45% 0px -50% 0px" });
    ids.forEach(function (id) {
      var el = document.getElementById(id);
      if (el) so.observe(el);
    });
  }
  /* ---------- Galeria de capturas dos cards ---------- */
  document.querySelectorAll(".thumbs").forEach(function (lista) {
    var principal = lista.closest(".card").querySelector("img[data-galeria]");
    var botoes = lista.querySelectorAll(".thumb");
    botoes.forEach(function (btn) {
      btn.addEventListener("click", function () {
        principal.src = btn.dataset.src;
        principal.width = btn.dataset.w;
        principal.height = btn.dataset.h;
        principal.alt = btn.dataset.alt;
        botoes.forEach(function (b) { b.setAttribute("aria-pressed", b === btn ? "true" : "false"); });
      });
    });
  });
})();

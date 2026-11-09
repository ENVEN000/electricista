(function () {
  "use strict";

  // Menú móvil
  var toggle = document.getElementById("menu-toggle");
  var mobile = document.getElementById("nav-mobile");
  function setMenu(open) {
    mobile.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú principal" : "Abrir menú principal");
  }
  if (toggle && mobile) {
    toggle.addEventListener("click", function () { setMenu(!mobile.classList.contains("open")); });
    mobile.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  // Año
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // Aparición al hacer scroll
  var targets = document.querySelectorAll(".tile, .layer, .sector, .phase, .res-row, .faq details, .facts, .cert-band, .sec-head, .brand-cols > div");
  targets.forEach(function (el) { el.classList.add("reveal"); });
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { threshold: 0.08 });
    targets.forEach(function (el) { io.observe(el); });
  } else { targets.forEach(function (el) { el.classList.add("in"); }); }

  // Índice lateral: resalta la sección visible
  var tocLinks = document.querySelectorAll(".toc nav a");
  if (tocLinks.length && "IntersectionObserver" in window) {
    var map = {};
    tocLinks.forEach(function (a) { map[a.getAttribute("href").slice(1)] = a; });
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          tocLinks.forEach(function (l) { l.classList.remove("on"); });
          var a = map[en.target.id]; if (a) a.classList.add("on");
        }
      });
    }, { rootMargin: "-20% 0px -70% 0px" });
    Object.keys(map).forEach(function (id) { var h = document.getElementById(id); if (h) spy.observe(h); });
  }

  // Formulario (solo en /contacto/)
  /*
    GitHub Pages no procesa formularios. Opción A: Formspree (pegue su URL).
    Opción B: deje FORM_ENDPOINT vacío y se abrirá el correo (mailto).
  */
  var FORM_ENDPOINT = "https://formspree.io/f/xoeepaqd";
  var FALLBACK_EMAIL = "mc@enven.org";
  var form = document.getElementById("quote-form");
  var note = document.getElementById("form-note");
  if (!form || !note) return;
  function show(msg, cls) { note.textContent = msg; note.className = "form-note " + cls; }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var nombre = (data.get("nombre") || "").toString().trim();
    var email = (data.get("email") || "").toString().trim();
    form.querySelectorAll("input").forEach(function (i) { i.classList.remove("invalid"); });
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!nombre || !emailOk) {
      if (!nombre) form.elements.nombre.classList.add("invalid");
      if (!emailOk) form.elements.email.classList.add("invalid");
      show("Por favor ingrese su nombre y un correo válido.", "err");
      return;
    }
    if (FORM_ENDPOINT) {
      show("Enviando solicitud...", "");
      fetch(FORM_ENDPOINT, { method: "POST", headers: { "Accept": "application/json" }, body: data })
        .then(function (r) {
          if (!r.ok) throw new Error("http " + r.status);
          form.reset();
          show("Gracias. Recibimos su solicitud y nuestro equipo le contactará a la brevedad.", "ok");
        }).catch(function () { show("No fue posible enviar la solicitud. Intente nuevamente en unos minutos.", "err"); });
    } else {
      var body = "Nombre: " + nombre + "\nCorreo: " + email + "\nTeléfono: " + (data.get("telefono") || "") +
        "\nUbicación: " + (data.get("ubicacion") || "") + "\nProyecto: " + (data.get("proyecto") || "") + "\n\n" + (data.get("mensaje") || "");
      window.location.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + encodeURIComponent("Solicitud de cotización - " + data.get("proyecto")) + "&body=" + encodeURIComponent(body);
      show("Abriendo su cliente de correo para enviar la solicitud...", "ok");
    }
  });
})();

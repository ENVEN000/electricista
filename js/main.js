(function () {
  "use strict";

  // ---- Menú móvil ----
  var toggle = document.getElementById("menu-toggle");
  var nav = document.getElementById("main-nav");

  function setMenu(open) {
    nav.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú principal" : "Abrir menú principal");
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { setMenu(!nav.classList.contains("open")); });
    nav.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") setMenu(false); });
  }

  // ---- Año del footer ----
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---- Animación de aparición al hacer scroll ----
  var targets = document.querySelectorAll(".svc, .signal, .zone-tile, .guide-card, .duo-card, .timeline li, .deliver li, .faq details, .hub-card, .aside-card, .section-head");
  targets.forEach(function (el) { el.classList.add("reveal"); });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    targets.forEach(function (el) { io.observe(el); });
  } else {
    targets.forEach(function (el) { el.classList.add("in"); });
  }

  // ---- Formulario de cotización (solo en /contacto/) ----
  /*
    GitHub Pages es hosting estático y no procesa formularios.
    Opción A: Formspree (https://formspree.io) — pegue aquí su URL.
    Opción B: deje FORM_ENDPOINT vacío y se abrirá el correo del usuario (mailto).
  */
  var FORM_ENDPOINT = "https://formspree.io/f/xoeepaqd";
  var FALLBACK_EMAIL = "mc@enven.org";

  var form = document.getElementById("quote-form");
  var note = document.getElementById("form-note");
  if (!form || !note) return;

  function show(msg, cls) {
    note.textContent = msg;
    note.className = "form-note " + cls;
  }

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
      fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Accept": "application/json" },
        body: data
      }).then(function (r) {
        if (!r.ok) throw new Error("http " + r.status);
        form.reset();
        show("Gracias. Recibimos su solicitud y nuestro equipo le contactará a la brevedad.", "ok");
      }).catch(function () {
        show("No fue posible enviar la solicitud. Intente nuevamente en unos minutos.", "err");
      });
    } else {
      var body =
        "Nombre: " + nombre +
        "\nCorreo: " + email +
        "\nTeléfono: " + (data.get("telefono") || "") +
        "\nZona: " + (data.get("zona") || "") +
        "\nTrabajo: " + (data.get("proyecto") || "") +
        "\n\n" + (data.get("mensaje") || "");
      window.location.href = "mailto:" + FALLBACK_EMAIL +
        "?subject=" + encodeURIComponent("Solicitud de cotización - " + data.get("proyecto")) +
        "&body=" + encodeURIComponent(body);
      show("Abriendo su cliente de correo para enviar la solicitud...", "ok");
    }
  });
})();

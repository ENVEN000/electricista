(function () {
  var t = document.getElementById("menu-toggle"), m = document.getElementById("nav-mobile");
  if (t && m) t.addEventListener("click", function () { var o = m.classList.toggle("open"); t.setAttribute("aria-expanded", o ? "true" : "false"); });
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();
  var FORM_ENDPOINT = "https://formspree.io/f/xoeepaqd", FALLBACK_EMAIL = "info@enven.org";
  var form = document.getElementById("quote-form"), note = document.getElementById("form-note");
  if (!form || !note) return;
  function show(msg, cls) { note.textContent = msg; note.className = "form-note " + cls; }
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    form.querySelectorAll("input,textarea").forEach(function (i) { i.classList.remove("invalid"); });
    var ok = true;
    if (!(data.get("nombre") || "").trim()) { form.elements.nombre.classList.add("invalid"); ok = false; }
    if (!(data.get("empresa") || "").trim()) { form.elements.empresa.classList.add("invalid"); ok = false; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((data.get("email") || "").trim())) { form.elements.email.classList.add("invalid"); ok = false; }
    if (!ok) { show("Revise los campos marcados: nombre, empresa y un correo válido.", "err"); return; }
    show("Enviando solicitud…", "");
    fetch(FORM_ENDPOINT, { method: "POST", headers: { "Accept": "application/json" }, body: data })
      .then(function (r) { if (!r.ok) throw new Error(); show("Solicitud enviada. Nuestro equipo le responderá a la brevedad.", "ok"); form.reset(); })
      .catch(function () {
        var body = ["Nombre: " + data.get("nombre"), "Cargo: " + data.get("cargo"), "Empresa: " + data.get("empresa"), "Correo: " + data.get("email"), "Teléfono: " + data.get("telefono"), "Sector: " + data.get("sector"), "Requerimiento: " + data.get("requerimiento"), "Plazo: " + data.get("plazo"), "", data.get("mensaje")].join("\n");
        window.location.href = "mailto:" + FALLBACK_EMAIL + "?subject=" + encodeURIComponent("Solicitud de propuesta - ENVEN Grupo") + "&body=" + encodeURIComponent(body);
        show("No pudimos enviar el formulario; se abrió su correo para que complete el envío.", "err");
      });
  });
})();

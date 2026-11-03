# Electricista residencial e industrial en Caracas

Sitio estático (HTML + CSS + JS) listo para **GitHub Pages**. Sin dependencias ni proceso de build.
Dominio: **electricista.enven.org**

```
index.html
css/styles.css
js/main.js
img/  logo.svg · favicon.svg · hero-tablero.svg · sala-electrica.svg · og-image.png
CNAME · robots.txt · sitemap.xml
```

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub y sube estos archivos a la raíz.
2. Ve a **Settings → Pages** → *Deploy from a branch*, rama `main`, carpeta `/ (root)`.
3. En *Custom domain* escribe `electricista.enven.org` (el archivo `CNAME` ya lo incluye) y activa *Enforce HTTPS*.
4. En el DNS de `enven.org` crea un registro **CNAME**: `electricista` → `TU-USUARIO.github.io`.

## Personalización rápida

| Qué cambiar | Dónde |
|---|---|
| Número de WhatsApp | Buscar `wa.me/584241785958` en `index.html` (formato internacional sin `+`) |
| Correo, teléfono | Footer y JSON-LD de `index.html`, y `FALLBACK_EMAIL` en `js/main.js` |
| Zonas de cobertura (Gran Caracas) | Bloque `areaServed` del JSON-LD en `<head>` y el footer de `index.html` |
| Colores | Variables `:root` al inicio de `css/styles.css` |
| Imágenes | Reemplaza los SVG de `img/` por fotos reales y actualiza el `src` |
| Testimonios | Sección `#confianza`: hay un comentario HTML indicando cómo reemplazar los compromisos por testimonios reales |

## Formulario de cotización

GitHub Pages no procesa formularios. En `js/main.js`:

- **Formspree:** `FORM_ENDPOINT` ya tiene un endpoint configurado. El formulario envía el campo `_subject` ("Solicitud de cotización - Electricista Caracas") para distinguir estos mensajes.
- **Sin endpoint:** déjalo vacío y el formulario abrirá el correo del usuario con el mensaje prellenado (`mailto:`).

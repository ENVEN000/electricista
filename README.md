# Electricista residencial e industrial en Caracas

Sitio estático multipágina (HTML + CSS + JS) para **GitHub Pages**, con dominio **electricista.enven.org**.

## Estructura

```
index.html                     Portada
servicios/                     Índice + 8 páginas de servicio
zonas/                         Índice + 5 páginas de zona (Gran Caracas)
guias/                         Índice + 4 guías
contacto/                      Formulario, WhatsApp, perfil de Google
404.html · sitemap.xml · robots.txt · CNAME
css/ js/ img/
```

Las páginas se generaron con un script; si quiere editar texto, modifique el HTML directamente.

## Publicar

1. Suba todos los archivos a la raíz del repositorio de este sitio (reemplaza la versión anterior).
2. Settings → Pages: rama `main`, carpeta `/ (root)`, dominio personalizado `electricista.enven.org`, *Enforce HTTPS* activo.
3. Los enlaces internos usan rutas desde la raíz (`/servicios/...`), pensadas para el dominio propio.

## Después de publicar (indexación)

1. En Search Console, envíe `https://electricista.enven.org/sitemap.xml` otra vez.
2. Use *Inspección de URL* y **Solicitar indexación** para la portada y las páginas principales.
3. Enlace el sitio desde otras páginas y redes, y complete su perfil de Google.

## Personalización

| Qué | Dónde |
|---|---|
| WhatsApp / teléfono / correo | Buscar `584241785958` y `mc@enven.org` en los HTML y en `js/main.js` |
| Perfil de Google | Enlace `share.google/...` en cabecera, footer, contacto y datos estructurados |
| Zonas de cobertura | Páginas en `zonas/` y bloque `areaServed` del JSON-LD |
| Colores | Variables `:root` en `css/styles.css` |
| Testimonios | Comentario HTML en la portada, sección `#entrega` |

## Formulario

`FORM_ENDPOINT` en `js/main.js` usa Formspree; envía el asunto «Solicitud de cotización - Electricista Caracas». Sin endpoint, abre el correo del usuario (mailto).

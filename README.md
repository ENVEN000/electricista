# ENVEN · io.enven.org

Sitio estático multipágina para **GitHub Pages**, dominio `io.enven.org`.

```
index.html
servicios/       índice + 9 servicios
certificacion/   pilar + 4 páginas (DTX-1800, parámetros, fibra Tier 1/2, reportes y garantía)
sectores/        índice + 5 sectores
recursos/        índice + 4 notas técnicas
contacto/ · 404.html · sitemap.xml · robots.txt · CNAME
css/ js/ img/
```

## Publicar
1. Suba el contenido a la raíz del repositorio de `io` (reemplaza la versión anterior) y conserve el `CNAME`.
2. Settings → Pages: rama `main`, carpeta `/ (root)`, dominio `io.enven.org`, Enforce HTTPS.
3. Los recursos (css/js/img) usan rutas relativas; los enlaces de navegación usan rutas desde la raíz, pensadas para el dominio.
   Para recorrer el sitio en local: `py -m http.server 8000` dentro de la carpeta y abrir `http://localhost:8000`.

## Después de publicar
Envíe `https://io.enven.org/sitemap.xml` en Search Console y solicite indexación de la portada, `/certificacion/` y `/servicios/`.

## Formulario
`FORM_ENDPOINT` en `js/main.js` (Formspree). Asunto: «Solicitud de cotización - ENVEN IO».

## Nota sobre la sección de certificación
Menciona equipos de la clase Fluke DTX-1800 / DSX / Versiv como ejemplo de capacidades. Ajuste los textos al equipo que realmente utilice y mantenga la calibración vigente.

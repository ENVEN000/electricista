# ENVEN Grupo · enven.org

Sitio estático corporativo del grupo (GitHub Pages). Enlaza a io.enven.org y electricista.enven.org.

## Publicar
1. Cree un repositorio (por ejemplo `enven-grupo`) y suba el contenido de esta carpeta a la raíz, con el `CNAME`.
2. Settings → Pages → rama `main`, carpeta `/ (root)`, dominio `enven.org`, Enforce HTTPS.
3. DNS en Spaceship (solo cuando el sitio esté listo): cuatro registros A para `@` hacia 185.199.108.153, 185.199.109.153, 185.199.110.153 y 185.199.111.153, y CNAME `www` hacia `ENVEN000.github.io`. No toque los CNAME de `io` y `electricista`.
4. Search Console: propiedad de dominio, enviar `sitemap.xml` y solicitar indexación de la portada.

Los recursos usan rutas relativas; la navegación usa rutas desde la raíz. Para recorrerlo en local: `py -m http.server 8000`.

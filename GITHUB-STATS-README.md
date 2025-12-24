# GitHub Stats Personalizadas

Este proyecto crea estadísticas personalizadas de GitHub con un diseño moderno y elegante.

## 📁 Archivos

- `github-stats.html` - Página HTML principal
- `styles.css` - Estilos personalizados
- `github-stats.js` - Script para obtener datos de GitHub API

## 🚀 Cómo usar

### Opción 1: Abrir localmente

1. Abre el archivo `github-stats.html` en tu navegador
2. Las estadísticas se cargarán automáticamente desde la API de GitHub

### Opción 2: Hosting en GitHub Pages

1. Crea un nuevo repositorio (por ejemplo: `github-stats`)
2. Sube los archivos: `github-stats.html`, `styles.css`, y `github-stats.js`
3. Ve a Settings → Pages
4. Selecciona la rama `main` como source
5. Tu página estará disponible en: `https://VaninaLopetegui.github.io/github-stats/`

### Opción 3: Captura de pantalla para README

1. Abre `github-stats.html` en tu navegador
2. Toma una captura de pantalla
3. Sube la imagen a tu repositorio o usa un servicio como imgur
4. Agrega la imagen a tu README:

```markdown
![GitHub Stats](./ruta-a-tu-imagen.png)
```

## 🎨 Personalización

### Cambiar colores

Edita `styles.css` para cambiar los colores del tema:

```css
.stats-card {
    background: linear-gradient(135deg, #TU_COLOR_1 0%, #TU_COLOR_2 100%);
}
```

### Agregar token de GitHub (Opcional)

Si encuentras límites de rate, agrega un token personal:

1. Ve a GitHub Settings → Developer settings → Personal access tokens
2. Genera un nuevo token (solo necesita permisos de lectura pública)
3. En `github-stats.js`, agrega tu token:

```javascript
const GITHUB_TOKEN = 'tu_token_aquí';
```

## 📊 Características

- ⭐ Total de estrellas obtenidas
- ⏰ Commits del último año
- 🔀 Pull requests totales
- 📊 Gráfico circular con calificación
- 🎨 Lenguajes más usados con porcentajes
- 🌙 Tema oscuro moderno
- 📱 Diseño responsive

## 🔧 Tecnologías

- HTML5
- CSS3 (con gradientes y animaciones)
- JavaScript (Vanilla)
- GitHub REST API

## 📝 Notas

- Las estadísticas se actualizan automáticamente cada vez que cargas la página
- La API de GitHub tiene un límite de 60 solicitudes por hora sin autenticación
- Con un token personal, el límite aumenta a 5000 solicitudes por hora

---

Creado con 💜 por Vanina Lopetegui

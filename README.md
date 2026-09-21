# 🌻 Girasol de Amor Interactivo

Una experiencia web interactiva, romántica y responsiva diseñada para regalar a esa persona especial. Cada pétalo revela una razón o mensaje de amor con animaciones doradas, música ambiental y efectos visuales.

> **Dedicatoria:** De **Mai** para **Andri** 💛 (Personalizable para cualquier pareja).

---

## ✨ Características Principales

- **Girasol Botánico SVG:** 12 pétalos interactivos con animaciones de resplandor, zoom suave y cambio de estado visual al ser descubiertos.
- **Centro Interactivo:** Flósculos con textura orgánica y corazón pulsante que revela pétalos sorpresa con destellos de corazones.
- **Efectos de Audio Inmersivos (Web Audio API):**
  - Campanillas pentatónicas armónicas al presionar cada pétalo.
  - Reproductor de melodía ambiental sintetizada en tiempo real (sin enlaces caídos ni archivos pesados).
  - Acorde triunfal al completar los 12 pétalos.
- **Celebración de Victoria:** Modal con dedicatoria romántica y explosión de lluvia de corazones dorados en Canvas.
- **Personalización y Compartir en 1 Clic:**
  - Modal para modificar los nombres (De / Para).
  - Generador de enlace automático con soporte para parámetros URL (`?to=Andri&from=Mai`).
  - Botón directo para enviar por **WhatsApp**.
- **Diseño Mobile-First:** Experiencia optimizada para smartphones y elegante vista enmarcada para ordenadores/pantallas grandes.
- **Persistencia de Progreso:** Guarda automáticamente el avance en el navegador (`localStorage`).

---

## 🚀 Guía de Despliegue en GitHub Pages (Paso a Paso)

Para subir esta página a tu cuenta de GitHub y tener tu enlace público en minutos:

### Paso 1: Crear un nuevo repositorio en GitHub
1. Ve a [github.com/new](https://github.com/new).
2. Nombra tu repositorio (por ejemplo: `girasol-amor` o `un-girasol-para-ti`).
3. Déjalo como **Público (Public)** y **NO** marques la opción de inicializar con README (ya tenemos todo listo).
4. Haz clic en **Create repository**.

### Paso 2: Subir los archivos desde tu terminal
Abre tu terminal en la carpeta del proyecto (`girasol-amor-interactivo`) y ejecuta:

```bash
git init
git add .
git commit -m "feat: Girasol de Amor Interactivo listo para GitHub Pages"
git branch -M main
git remote add origin https://github.com/TU_USUARIO_GITHUB/NOMBRE_DE_TU_REPOSITORIO.git
git push -u origin main
```

*(Reemplaza `TU_USUARIO_GITHUB` y `NOMBRE_DE_TU_REPOSITORIO` con tus datos).*

### Paso 3: Activar GitHub Pages
1. En tu repositorio en GitHub, entra a la pestaña **Settings** (Configuración).
2. En el menú lateral izquierdo, haz clic en **Pages**.
3. En la sección **Build and deployment > Source**, selecciona `Deploy from a branch`.
4. En **Branch**, selecciona `main` y carpeta `/(root)`.
5. Haz clic en **Save**.
6. En 1 o 2 minutos, GitHub te entregará la URL pública:  
   `https://TU_USUARIO_GITHUB.github.io/NOMBRE_DE_TU_REPOSITORIO/`

---

## 💌 Cómo Enviar el Enlace Personalizado

Puedes abrir tu página en el navegador y compartirla directamente:
- Para Andri: `https://TU_USUARIO_GITHUB.github.io/NOMBRE_DE_TU_REPOSITORIO/?to=Andri&from=Mai`
- O usa el botón **"Dedicatoria"** dentro de la web para copiar el enlace o enviarlo directamente a WhatsApp.

---

## 🛠️ Tecnologías Utilizadas

- **HTML5 Semántico & SVG Botánico**
- **CSS3 & Tailwind CSS CDN**
- **JavaScript ES6 Vanilla**
- **Web Audio API** (Sintetizador de audio nativo)
- **HTML5 Canvas** (Efectos de partículas y lluvia de corazones)

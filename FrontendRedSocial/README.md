# 🎓 Red Social Escolar - React SPA

¡Bienvenido al repositorio de nuestra **Red Social Escolar**! 🚀

Este proyecto representa la migración completa de un conjunto de plantillas estáticas en HTML (basadas en W3.CSS) hacia una moderna **Single Page Application (SPA)** construida con React. Hemos aplicado los mejores estándares de la industria para crear un frontend modular, escalable e interactivo, centrándonos firmemente en la arquitectura.

---

## 🏗️ Hitos Arquitectónicos

Este proyecto fue diseñado siguiendo un flujo estricto de desarrollo frontend. Los logros técnicos más destacados incluyen:

- **🗺️ Enrutamiento Dinámico (SPA):** Implementación de `react-router-dom` para gestionar la navegación sin recargas de página, mejorando drásticamente la experiencia del usuario.
- **🛡️ Rutas Restringidas (Protected Routes):** Creación de un High-Order Component (`<ProtectedRoute>`) que vigila el acceso a vistas privadas (como el Feed y el Perfil), redirigiendo al `/login` si el usuario no tiene una sesión activa.
- **🔗 Parámetros de URL Dinámicos:** Configuración de lectura de parámetros en el enrutador (ej. `/perfil/:username`) utilizando `useParams` para renderizar datos filtrados basados en la ruta visitada.
- **🧩 Aislamiento de Lógica UI:** División estricta entre "Smart Components" (Páginas) y "Dumb Components" (UI pura). Como prueba de esto, implementamos el componente `<ImageCarousel />` que encapsula la lógica de estado local cíclico para las publicaciones con múltiples fotos.
- **⏳ Consumo Asíncrono Simulado:** Separación de la capa de datos creando el módulo de servicios (`src/services/api.js`). Utilizamos promesas simuladas (`setTimeout`) junto con `useEffect` y estados de carga (`loading`) para replicar el comportamiento del consumo real de un Backend.

---

## 📁 Estructura del Proyecto

Nuestra arquitectura de carpetas está pensada para escalar fácilmente si el proyecto crece:

```text
red-social/
├── muestra/                   # 📄 Archivos HTML originales (Referencia de diseño estático).
├── src/
│   ├── components/            # 🧱 "Dumb Components" y componentes reusables (Navbar, Post, Carousel, ProtectedRoute, Context).
│   ├── layouts/               # 🖼️ Contenedores de diseño (MainLayout) que evitan repetir código global.
│   ├── pages/                 # 🧠 "Smart Components" o Vistas (FeedPage, ProfilePage, LoginPage).
│   └── services/              # 🔌 Lógica de conexión y consumo de APIs simuladas (api.js).
│   ├── App.jsx                # 🔀 Orquestador principal y configuración del Router.
│   └── main.jsx               # ⚛️ Punto de montaje de React.
└── package.json               # 📦 Dependencias y scripts.
```

---

## 🚀 Instrucciones de Ejecución

Para evaluar y probar este proyecto localmente, asegúrate de tener [Node.js](https://nodejs.org/) instalado y sigue estos pasos en tu terminal:

1. **Instalar dependencias:**
   Descarga todas las librerías necesarias (incluyendo React Router) ejecutando:
   ```bash
   npm install
   ```

2. **Iniciar el servidor de desarrollo:**
   Levanta la aplicación localmente mediante Vite:
   ```bash
   npm run dev
   ```

3. **Ver la aplicación:**
   Abre tu navegador web e ingresa a la dirección indicada por la consola (generalmente `http://localhost:5173`).

---

*Desarrollado con 💻 y ☕ como demostración de Arquitectura Frontend Avanzada.*

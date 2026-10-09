# 🌐 Red Social Full Stack

¡Bienvenido al repositorio oficial de nuestra Red Social! Este es un proyecto Full Stack moderno, construido desde cero con un enfoque en el rendimiento, la escalabilidad y una experiencia de usuario (UX) de primer nivel.

Este proyecto integra un sistema de autenticación robusto, persistencia de datos relacional y un diseño completamente responsivo que incluye modo oscuro nativo. 

La arquitectura se divide en dos carpetas principales, gestionando así los entornos de frontend y backend de manera independiente.

---

## 💻 Stack Tecnológico

El proyecto hace uso de tecnologías líderes y modernas en la industria:

### 🎨 Frontend (`/FrontendRedSocial`)
- **React 18** (Librería principal de UI)
- **Vite** (Empaquetador y servidor de desarrollo ultrarrápido)
- **React Router DOM** (Navegación fluida tipo SPA)
- **Context API** (Manejo de estado global sin dependencias externas complejas)
- **W3.CSS** (Framework CSS ligero y altamente predecible)

### ⚙️ Backend (`/BackendRedSocial`)
- **Node.js** (Entorno de ejecución)
- **Express.js** (Framework de servidor)
- **MySQL** (Base de datos relacional)
- **Bcrypt.js** (Encriptación segura de contraseñas)
- **JWT (JSON Web Tokens)** (Autenticación basada en tokens)

---

## 📋 Prerrequisitos

Para ejecutar este proyecto en tu entorno local, asegúrate de tener instalado:

1. **[Node.js](https://nodejs.org/es/)** (v16.0 o superior)
2. **Un servidor MySQL en ejecución** (puedes utilizar herramientas como [XAMPP](https://www.apachefriends.org/es/index.html), WampServer o Docker)

> **Nota:** Verifica que el servidor MySQL se esté ejecutando en el puerto local por defecto (`3306`) y tengas configuradas las credenciales correctamente.

---

## 🚀 Instrucciones de Instalación y Arranque (El Mapa)

Sigue estos simples pasos para levantar el entorno de desarrollo completo en minutos.

### Paso 1: Configurar la Base de Datos y Backend
Abre tu terminal favorita, dirígete a la carpeta del backend y descarga las dependencias.

```bash
cd BackendRedSocial
npm install
```

Una de las grandes ventajas de este proyecto es su sistema de inicialización de base de datos automático. Ejecuta el siguiente comando para crear las tablas y sembrar datos iniciales:

```bash
node src/config/init-db.js
```

### Paso 2: Levantar el Servidor Backend
Una vez que la base de datos esté inicializada con éxito, enciende tu servidor en modo desarrollo:

```bash
npm run dev
```
*El servidor quedará en escucha y listo para procesar peticiones.*

### Paso 3: Levantar el Entorno Frontend
Abre una **nueva pestaña** en tu terminal (para mantener el backend corriendo al mismo tiempo), y dirígete a la carpeta del frontend:

```bash
cd FrontendRedSocial
npm install
npm run dev
```
*Vite levantará el proyecto frontend casi instantáneamente. ¡Abre tu navegador en la ruta indicada y comienza a explorar la Red Social!*

---

## ✨ Características Principales

- 🔐 **Login y Autenticación Segura:** Generación de JWT y encriptado con Bcrypt.js para resguardar la identidad e información de los usuarios.
- 🛠️ **Inicialización Automática de DB:** Scripts preparados para auto-crear la base de datos sin requerir scripts manuales en clientes SQL.
- 🔍 **Buscador Dinámico e Intuitivo:** Componente buscador en la barra de navegación que interactúa directamente con el servidor con manejo de flujos vacíos ('Usuario no encontrado') y excelente UX.
- 🌗 **Modo Oscuro Persistente:** Preferencias del tema manejadas a través de React Context y `localStorage`.
- 📱 **Diseño 100% Responsivo:** Uso maestro de W3.CSS para conseguir vistas adaptativas de menús y barras laterales en cualquier resolución de dispositivo.

---
*Diseñado y construido como Arquitecto Full Stack con pasión y dedicación.*

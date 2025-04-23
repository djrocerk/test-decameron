# 🏨 Decameron Test - Sistema de Gestión Hotelera

**Decameron Test** es una aplicación web desarrollada para facilitar la gestión de los hoteles asociados a la compañía. El sistema permite registrar hoteles junto con su información básica y tributaria, así como administrar los tipos de habitación y sus respectivas acomodaciones, cumpliendo con las reglas operativas establecidas.

---

## ⚙️ Funcionalidades Principales

- Registro de hoteles con:
  - Información general
  - Datos tributarios
- Administración de tipos de habitación:
  - Estándar
  - Junior
  - Suite
- Asignación de acomodaciones según tipo de habitación:
  - **Estándar** → Sencilla, Doble  
  - **Junior** → Triple, Cuádruple  
  - **Suite** → Sencilla, Doble, Triple
- Validaciones automáticas para garantizar consistencia en las asignaciones

---

## 🚀 Guía de Instalación

Este proyecto está dividido en dos partes: **frontend (React)** y **backend (Laravel)**.

---

### 🧾 Requisitos Previos

Asegúrate de tener instalado:

- Node.js (v14+)
- PHP (v8+)
- Composer
- PostgreSQL
- Laravel CLI (`composer global require laravel/installer`)

---

### 📦 Clonar el repositorio

```bash
git clone https://github.com/djrocerk/test-decameron.git
cd test-decameron
```

---

## ⚛️ Frontend – React

Ubicación: `hotel-frontend`

```bash
cd hotel-frontend
npm install       # Instala dependencias
npm start         # Inicia el servidor de desarrollo
```

---

## 🖥️ Backend – Laravel

Ubicación: `hotel-system-back`

```bash
cd hotel-system-back
composer install          # Instala dependencias de Laravel
cp .env.example .env      # Crea el archivo de entorno
php artisan key:generate  # Genera la APP_KEY
```

---

### ⚙️ Configuración de la base de datos (PostgreSQL)

Edita el archivo `.env`:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nombre_base_de_datos
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

---

### 🧪 Configuración para pruebas (opcional)

Edita `.env.testing` para tu base de datos de pruebas:

```env
DB_CONNECTION=pgsql
DB_HOST=127.0.0.1
DB_PORT=5432
DB_DATABASE=nombre_base_test
DB_USERNAME=usuario
DB_PASSWORD=contraseña
```

---

### 🗄️ Migraciones de base de datos

```bash
php artisan migrate
```

---

### ▶️ Iniciar el servidor

```bash
php artisan serve
```

---

## 📂 Estructura del Proyecto

```
test-decameron/
│
├── hotel-frontend/        # Frontend React + Vite
└── hotel-system-back/     # Backend Laravel
```

---

## 🛠️ Tecnologías Utilizadas

- **Frontend**: React, Vite, JavaScript, HTML, CSS
- **Backend**: Laravel, PHP, PostgreSQL
- **Herramientas**: Composer, Artisan, Node.js, npm

---

## 🤝 Contribuciones

Desarrollado por **Roberto Cerquera Guerrero** como parte de un ejercicio técnico para Decameron.  


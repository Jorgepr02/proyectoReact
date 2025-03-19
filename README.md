## Autor
Jorge Pampín Ríos

## Descripción del Proyecto
SnowShop es una aplicación web de e-commerce para la venta de productos de deportes de invierno como esquís, tablas de snow y accesorios relacionados. La aplicación está construida con React para el frontend y utiliza Firebase como backend para la gestión de productos, autenticación de usuarios y almacenamiento de datos.

## Funcionalidades

- Catálogo de productos con filtrado por categorías y ordenación por precio
- Búsqueda de productos por nombre y descripción
- Sistema de autenticación de usuarios (registro, inicio de sesión tradicional y con Google)
- Gestión de carrito de compras
- Visualización detallada de productos
- Diseño responsivo para dispositivos móviles y de escritorio

## Tecnologías Utilizadas

- **Frontend**:
  - React 19
  - React Router 7
  - React Icons
  - React Toastify
  - TailwindCSS 3

- **Backend**:
  - Firebase (Firestore, Authentication, Storage)
  - Express.js (Servidor para imágenes)
  - Multer (Manejo de archivos)

## Requisitos Previos

Antes de instalar el proyecto, necesitarás tener instalado:

1. [Node.js](https://nodejs.org/) (v16.0.0 o superior)
2. npm (normalmente viene con Node.js)
3. Git (opcional, para clonar el repositorio)

## Instrucciones de Instalación

### 1. Clonar el Repositorio

```bash
git clone https://github.com/Jorgepr02/proyectoReact.git
```

### 2. Configurar el Servidor de Imágenes

El proyecto utiliza un servidor Express para gestionar las imágenes de los productos:

```bash
# Instalar dependencias del servidor
npm install

# Iniciar el servidor
npm start server.js
```

El servidor se iniciará en `http://localhost:5000`.

### 3. Configurar la Aplicación React

```bash
# Navegar al directorio de la aplicación React
cd proyectoReact

# Instalar dependencias
npm install

# Iniciar la aplicación en modo desarrollo
npm run dev
```

La aplicación React se ejecutará en `http://localhost:5173`.

### 4. Configuración de Firebase

Las credenciales ya están puestas en el archivo firebaseConfig.js

## Uso de la Aplicación

1. **Navegación**: Explora productos desde la página principal o la sección de productos
2. **Búsqueda**: Utiliza el buscador en la barra de navegación para encontrar productos específicos
3. **Filtrado**: Filtra productos por categoría o ordénalos por precio
4. **Compra**: Inicia sesión para añadir productos al carrito
5. **Carrito**: Gestiona tus productos, cantidades y procede al pago

## Información de Contacto

Para cualquier consulta relacionada con la instalación o configuración de la aplicación:
- **Desarrollador**: Jorge Pampín Ríos
- **Email**: jorgepampinrios02@liceolapaz.net
- **GitHub**: [Jorgepr02](https://github.com/Jorgepr02)
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
git clone https://github.com/jorgepr-dev/snow-shop.git
cd snow-shop
```

### 2. Configurar el Servidor de Imágenes

El proyecto utiliza un servidor Express para gestionar las imágenes de los productos:

```bash
# Instalar dependencias del servidor
npm install

# Iniciar el servidor
npm start
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

Para conectar la aplicación con Firebase, necesitas crear un proyecto en Firebase y obtener las credenciales:

1. Ve a [Firebase Console](https://console.firebase.google.com/)
2. Crea un nuevo proyecto
3. Agrega una aplicación web a tu proyecto Firebase
4. Copia las credenciales en el archivo firebaseConfig.js:

```javascript
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};
```

5. Activa los servicios necesarios en Firebase:
   - Authentication: Email/Password y Google
   - Firestore Database: Crea una colección `products` y `users`
   - Storage: Para imágenes de productos

6. Configura las reglas de Firestore y Storage:
   - Copia las reglas de firestore.rules a tus reglas de Firestore
   - Copia las reglas de storage.rules a tus reglas de Storage

## Estructura del Proyecto

```
proyectoReact/
├── public/              # Archivos estáticos
├── src/
│   ├── api/             # Conexiones con Firebase y API
│   ├── assets/          # Imágenes y recursos
│   ├── components/      # Componentes reutilizables
│   ├── context/         # Contextos de React (Auth, Cart, Products)
│   ├── firebase/        # Configuración y reglas de Firebase
│   ├── pages/           # Páginas principales
│   ├── styles/          # Estilos globales
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── routes.jsx       # Configuración de rutas
├── index.html           # HTML principal
├── tailwind.config.js   # Configuración de Tailwind CSS
├── package.json         # Dependencias y scripts
└── vite.config.js       # Configuración de Vite

uploads/                # Directorio de imágenes subidas (servidor)
server.js               # Servidor Express para imágenes
```

## Uso de la Aplicación

1. **Navegación**: Explora productos desde la página principal o la sección de productos
2. **Búsqueda**: Utiliza el buscador en la barra de navegación para encontrar productos específicos
3. **Filtrado**: Filtra productos por categoría o ordénalos por precio
4. **Compra**: Inicia sesión para añadir productos al carrito
5. **Carrito**: Gestiona tus productos, cantidades y procede al pago

## Información de Contacto

Para cualquier consulta relacionada con la instalación o configuración de la aplicación:
- **Desarrollador**: Jorge Pampín Ríos
- **Email**: jorge.pampin@example.com
- **GitHub**: [jorgepr-dev](https://github.com/jorgepr-dev)

## Licencia

Este proyecto está licenciado bajo la Licencia MIT - ver el archivo LICENSE para más detalles.
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useAuth } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import loadingGif from "./assets/skigif.gif";

const AuthRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // Mostrar loader mientras se verifica la autenticación
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <img 
        src={loadingGif}  
        alt="Cargando..." 
        className="w-32 h-32" 
      />
    </div>
  ); 

  return user ? <Navigate to="/" /> : children;
};

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  
  // Mostrar loader mientras se verifica la autenticación
  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <img 
        src={loadingGif}  
        alt="Cargando..." 
        className="w-32 h-32" 
      />
    </div>
  );
  
  return user ? children : <Navigate to="/login" />;
};

const AppRoutes = () => {
  return (
    <Router>
      <ScrollToTop />
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          {/* Rutas públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/login" element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          } />
          <Route path="/register" element={
            <AuthRoute>
              <Register />
            </AuthRoute>
          } />

          {/* Rutas privadas (requieren autenticación) */}
          <Route
            path="/cart"
            element={
              <PrivateRoute>
                <Cart />
              </PrivateRoute>
            }
          />

          {/* Ruta 404 */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
};

export default AppRoutes;
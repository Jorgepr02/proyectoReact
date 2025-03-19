import { useState } from "react";
import { loginUser, loginWithGoogle } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";
import { FiLogIn } from "react-icons/fi";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await loginUser(email, password);
      toast.success("Inicio de sesión exitoso");
      navigate("/");
    } catch (error) {
      toast.error(error.message || "Error al iniciar sesión");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Sesión iniciada con Google");
      navigate("/");
    } catch (error) {
      console.error("Error de Google Login:", error);
      toast.error(error.message || "Error al iniciar sesión con Google");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 bg-gray-800/60 rounded-lg shadow-lg text-white border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6">Iniciar Sesión</h2>
        
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input
              id="email"
              type="email"
              placeholder="tu@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
            <input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>
          
          <button 
            type="submit" 
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center gap-2 transition-colors"
          >
            <FiLogIn />
            Iniciar Sesión
          </button>
        </form>
        
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-600"></div>
          </div>
          <div className="relative flex justify-center">
            <span className="px-2 bg-gray-800/60 text-sm">O continúa con</span>
          </div>
        </div>
        
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-2 p-2 bg-white text-gray-800 rounded hover:bg-gray-100 transition-colors"
        >
          <FcGoogle size={20} /> 
          Iniciar sesión con Google
        </button>
        
        <p className="mt-4 text-sm text-center">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-blue-400 hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
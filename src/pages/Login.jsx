import { useState } from "react";
import { loginUser, loginWithGoogle } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

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
      toast.error(error);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle();
      toast.success("Sesión iniciada con Google");
      navigate("/");
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Iniciar Sesión</h2>
      <form onSubmit={handleLogin} className="flex flex-col gap-4 mt-4">
        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">
          Iniciar Sesión
        </button>
      </form>
      <button
        onClick={handleGoogleLogin}
        className="flex items-center gap-2 p-2 mt-4 border rounded"
      >
        <FcGoogle size={20} /> Iniciar sesión con Google
      </button>
    </div>
  );
};

export default Login;
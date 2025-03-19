import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FiUser } from "react-icons/fi";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    firstName: "",
    lastName: "",
    email: "",
    birthDate: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) newErrors.username = "El nombre de usuario es obligatorio";
    if (!formData.firstName.trim()) newErrors.firstName = "El nombre es obligatorio";
    if (!formData.lastName.trim()) newErrors.lastName = "El apellido es obligatorio";
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Correo inválido";

    // Validación si es mayor de 18 años
    const birthDate = new Date(formData.birthDate);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    if (!formData.birthDate) newErrors.birthDate = "La fecha de nacimiento es obligatoria";
    else if (age < 18) newErrors.birthDate = "Debes ser mayor de 18 años";

    if (!formData.password.trim() || formData.password.length < 6)
      newErrors.password = "La contraseña debe tener al menos 6 caracteres";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Limpia el error cuando el usuario edita
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await registerUser(formData.email, formData.password, {
        username: formData.username,
        firstName: formData.firstName,
        lastName: formData.lastName,
        birthDate: formData.birthDate,
      });

      toast.success("Registro exitoso, iniciando sesión...");
      navigate("/");
    } catch (error) {
      toast.error("Error en el registro: " + error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="w-full max-w-md p-6 bg-gray-800/60 rounded-lg shadow-lg text-white border border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-6">Registro</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium mb-1">Nombre de usuario</label>
            <input 
              id="username"
              type="text" 
              name="username" 
              placeholder="Nombre de usuario"
              value={formData.username} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            />
            {errors.username && <p className="text-red-500 text-sm mt-1">{errors.username}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium mb-1">Nombre</label>
              <input 
                id="firstName"
                type="text" 
                name="firstName" 
                placeholder="Nombre"
                value={formData.firstName} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              />
              {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
            </div>

            <div>
              <label htmlFor="lastName" className="block text-sm font-medium mb-1">Apellido</label>
              <input 
                id="lastName"
                type="text" 
                name="lastName" 
                placeholder="Apellido"
                value={formData.lastName} 
                onChange={handleChange} 
                required 
                className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
              />
              {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Correo electrónico</label>
            <input 
              id="email"
              type="email" 
              name="email" 
              placeholder="tu@email.com"
              value={formData.email} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>

          <div>
            <label htmlFor="birthDate" className="block text-sm font-medium mb-1">Fecha de nacimiento</label>
            <input 
              id="birthDate"
              type="date" 
              name="birthDate"
              value={formData.birthDate} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            />
            {errors.birthDate && <p className="text-red-500 text-sm mt-1">{errors.birthDate}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">Contraseña</label>
            <input 
              id="password"
              type="password" 
              name="password" 
              placeholder="Mínimo 6 caracteres"
              value={formData.password} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium mb-1">Confirmar contraseña</label>
            <input 
              id="confirmPassword"
              type="password" 
              name="confirmPassword" 
              placeholder="Repite tu contraseña"
              value={formData.confirmPassword} 
              onChange={handleChange} 
              required 
              className="w-full p-2 border rounded text-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" 
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>

          <button 
            type="submit" 
            className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center justify-center gap-2 transition-colors mt-2"
          >
            <FiUser />
            Crear cuenta
          </button>
        </form>
        
        <p className="mt-6 text-sm text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-blue-400 hover:underline">
            Inicia sesión aquí
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
import { useState } from "react";
import { registerUser } from "../api/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

    // Validación si es mayor de 18 años y esas cosas
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
    setErrors({ ...errors, [e.target.name]: "" }); // Limpiando el error cuando el usuario edita
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
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-2xl font-bold">Registro</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4 w-80">
        <input type="text" name="username" placeholder="Nombre de usuario" value={formData.username} onChange={handleChange} required className="p-2 border rounded" />
        {errors.username && <p className="text-red-500">{errors.username}</p>}

        <input type="text" name="firstName" placeholder="Nombre" value={formData.firstName} onChange={handleChange} required className="p-2 border rounded" />
        {errors.firstName && <p className="text-red-500">{errors.firstName}</p>}

        <input type="text" name="lastName" placeholder="Apellido" value={formData.lastName} onChange={handleChange} required className="p-2 border rounded" />
        {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}

        <input type="email" name="email" placeholder="Correo" value={formData.email} onChange={handleChange} required className="p-2 border rounded" />
        {errors.email && <p className="text-red-500">{errors.email}</p>}

        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required className="p-2 border rounded" />
        {errors.birthDate && <p className="text-red-500">{errors.birthDate}</p>}

        <input type="password" name="password" placeholder="Contraseña (mínimo 6 caracteres)" value={formData.password} onChange={handleChange} required className="p-2 border rounded" />
        {errors.password && <p className="text-red-500">{errors.password}</p>}

        <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" value={formData.confirmPassword} onChange={handleChange} required className="p-2 border rounded" />
        {errors.confirmPassword && <p className="text-red-500">{errors.confirmPassword}</p>}

        <button type="submit" className="p-2 bg-green-500 text-white rounded">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;
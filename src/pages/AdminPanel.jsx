import { useState } from "react";
import { useProducts } from "../context/ProductContext";
import { toast } from "react-toastify";

const AdminPanel = () => {
  const { addNewProduct } = useProducts();
  const [productData, setProductData] = useState({ title: "", price: "", image: "" });
  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setProductData({ ...productData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productData.title || !productData.price || !imageFile) {
      toast.error("Completa todos los campos y selecciona una imagen");
      return;
    }

    try {
      // Subir imagen al servidor
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch("http://localhost:5000/upload", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Error al subir la imagen");

      // Guardar producto con URL de la imagen local
      await addNewProduct({ ...productData, image: data.imageUrl });

      setProductData({ title: "", price: "", image: "" });
      setImageFile(null);
      toast.success("Producto agregado con imagen local");
    } catch (error) {
      toast.error("Error al subir la imagen");
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Administración de Productos</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
        <input
          type="text"
          name="title"
          placeholder="Nombre del producto"
          value={productData.title}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={productData.price}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          required
          className="p-2 border rounded"
        />
        <button type="submit" className="p-2 bg-green-500 text-white rounded">
          Agregar Producto
        </button>
      </form>
    </div>
  );
};

export default AdminPanel;
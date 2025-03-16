import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  console.log("🔗 Producto en ProductCard:", product); // Verificar si el ID es válido

  return (
    <div className="border p-4 rounded shadow">
      <img src={`http://localhost:5000${product.image}`} alt={product.title} className="w-full h-40 object-cover" />
      <h3 className="text-lg">{product.title}</h3>
      <p className="text-gray-600">${product.price}</p>
      <p className="text-gray-600">{product.description}</p>
      {product.id ? (
        <Link to={`/product/${product.id}`} className="text-blue-500">
          Ver detalles
        </Link>
      ) : (
        <p className="text-red-500">ID no disponible</p>
      )}
    </div>
  );
};

export default ProductCard;
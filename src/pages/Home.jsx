import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 5);

  if (loading) {
    return <p className="text-center text-gray-500">Cargando productos...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Bienvenido a nuestra Tienda</h1>
      <p className="text-gray-600 mt-2">Encuentra los mejores productos al mejor precio.</p>

      <h2 className="text-2xl font-bold mt-6">Productos Destacados</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {featuredProducts.length > 0 ? (
          featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-red-500">No hay productos disponibles</p>
        )}
      </div>
    </div>
  );
};

export default Home;
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import loadingGif from "../assets/skigif.gif"; 


const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 5);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <img 
          src={loadingGif}  
          alt="Cargando..." 
          className="w-32 h-32" 
        />
      </div>
    );  }

  return (
    <div className="container text-center mx-auto p-4">
      <h1 className="text-3xl text-white font-bold">HOME</h1>

      <h2 className="text-2xl text-white font-bold mt-6">Productos Destacados</h2>
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
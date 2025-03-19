import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { products } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    // Obtener el término de búsqueda de los parámetros de URL
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search");
    
    if (searchTerm) {
      // Filtrar productos por título que contiene el término de búsqueda (case insensitive)
      const filtered = products.filter(product => 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    } else {
      // Si no hay término de búsqueda, mostrar todos los productos
      setFilteredProducts(products);
    }
  }, [location.search, products]);

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");
  
  return (
    <div className="container text-center mx-auto p-4">
      {searchTerm ? (
        <h2 className="text-2xl text-white font-bold">Resultados para "{searchTerm}"</h2>
      ) : (
        <h2 className="text-2xl text-white font-bold">Todos los Productos</h2>
      )}
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-red-500 col-span-full py-10">
            No se encontraron productos{searchTerm ? ` que coincidan con "${searchTerm}"` : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
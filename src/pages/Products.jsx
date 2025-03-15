import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { products } = useProducts();

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold">Todos los Productos</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
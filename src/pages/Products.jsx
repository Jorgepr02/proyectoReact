import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";
import { FiFilter, FiArrowUp, FiArrowDown, FiX } from "react-icons/fi";
import loadingGif from "../assets/skigif.gif";

const Products = () => {
  const { products, loading } = useProducts();
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [sortOrder, setSortOrder] = useState(null);
  const filterRef = useRef(null);
  const location = useLocation();
  
  // Cerrar menú al hacer clic fuera
  useEffect(() => {
    function handleClickOutside(event) {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    // Obtener el término de búsqueda de los parámetros de la URL
    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("search");
    
    // Aplicar filtros (búsqueda + categoría)
    let filtered = [...products];
    
    // Filtrar por término de búsqueda (MODIFICADO - INCLUYE DESCRIPCIÓN)
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(product => 
        product.title.toLowerCase().includes(searchTermLower) || 
        product.description.toLowerCase().includes(searchTermLower)
      );
    }
    
    // Filtrar por categoría seleccionada
    if (selectedCategory !== "all") {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    
    // Ordenar por precio
    if (sortOrder === 'asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      filtered.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(filtered);
  }, [location.search, products, selectedCategory, sortOrder]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <img 
          src={loadingGif}  
          alt="Cargando..." 
          className="w-32 h-32" 
        />
      </div>
    );
  }

  const searchParams = new URLSearchParams(location.search);
  const searchTerm = searchParams.get("search");
  
  // Función para manejar el cambio de categoría
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setShowFilterMenu(false);
  };
  
  // Función para manejar el cambio de ordenación
  const toggleSortOrder = () => {
    if (sortOrder === null) setSortOrder('asc');
    else if (sortOrder === 'asc') setSortOrder('desc');
    else setSortOrder(null);
  };

  // Función para mostrar el texto de la categoría actual
  const getCategoryText = () => {
    switch(selectedCategory) {
      case 'all': return 'Todos';
      case 'ski': return 'Esquís';
      case 'board': return 'Tablas de Snow';
      case 'accessory': return 'Accesorios';
      default: return 'Todos';
    }
  };

  return (
    <div className="container text-center mx-auto p-4">
      {searchTerm ? (
        <h2 className="text-2xl text-white font-bold mb-4">Resultados para "{searchTerm}"</h2>
      ) : (
        <h2 className="text-2xl text-white font-bold mb-4">Todos los Productos</h2>
      )}
      
      {/* Barra de filtros y ordenación */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="text-gray-300">Categoría: {getCategoryText()}</span>
          {selectedCategory !== 'all' && (
            <button 
              onClick={() => setSelectedCategory('all')}
              className="bg-blue-500 text-white p-1 rounded-full hover:bg-blue-600"
            >
              <FiX size={14} />
            </button>
          )}
        </div>
        
        <div className="flex gap-3">
          {/* Filtro por categoría */}
          <div className="relative" ref={filterRef}>
            <button
              onClick={() => setShowFilterMenu(!showFilterMenu)}
              className="flex items-center gap-2 px-3 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
            >
              <FiFilter />
              <span className="hidden sm:inline">Filtrar</span>
            </button>
            
            {showFilterMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg z-10 overflow-hidden border border-gray-700">
                <button
                  onClick={() => handleCategoryChange("all")}
                  className={`w-full text-left px-4 py-2 transition-colors ${
                    selectedCategory === "all" ? "bg-blue-500 text-white" : "text-white hover:bg-gray-700"
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => handleCategoryChange("ski")}
                  className={`w-full text-left px-4 py-2 transition-colors ${
                    selectedCategory === "ski" ? "bg-blue-500 text-white" : "text-white hover:bg-gray-700"
                  }`}
                >
                  Esquís
                </button>
                <button
                  onClick={() => handleCategoryChange("board")}
                  className={`w-full text-left px-4 py-2 transition-colors ${
                    selectedCategory === "board" ? "bg-blue-500 text-white" : "text-white hover:bg-gray-700"
                  }`}
                >
                  Tablas de Snow
                </button>
                <button
                  onClick={() => handleCategoryChange("accessory")}
                  className={`w-full text-left px-4 py-2 transition-colors ${
                    selectedCategory === "accessory" ? "bg-blue-500 text-white" : "text-white hover:bg-gray-700"
                  }`}
                >
                  Accesorios
                </button>
              </div>
            )}
          </div>
          
          {/* Ordenar por precio */}
          <button
            onClick={toggleSortOrder}
            className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
              sortOrder ? 'bg-blue-500 text-white' : 'bg-gray-700 text-white hover:bg-gray-600'
            }`}
            title={sortOrder === 'asc' ? 'Precio: Bajo a Alto' : sortOrder === 'desc' ? 'Precio: Alto a Bajo' : 'Ordenar por precio'}
          >
            {sortOrder === 'asc' ? <FiArrowUp /> : sortOrder === 'desc' ? <FiArrowDown /> : <FiArrowUp />}
            <span className="hidden sm:inline">
              {sortOrder === 'asc' ? 'Precio ↑' : sortOrder === 'desc' ? 'Precio ↓' : 'Ordenar'}
            </span>
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p className="text-center text-red-500 col-span-full py-10">
            No se encontraron productos
            {searchTerm ? ` que coincidan con "${searchTerm}"` : ""}
            {selectedCategory !== "all" ? ` en la categoría seleccionada` : ""}
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
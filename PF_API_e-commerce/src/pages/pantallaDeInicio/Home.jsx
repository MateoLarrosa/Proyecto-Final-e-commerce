// Home.js
import React, { useState, useEffect, useCallback } from "react";
import Footer from "../../Components/Footer";
import Carousel from "../../Components/Carousel";
import ProductCard from "../../Components/ProductCard";
import FilterMenu from "../../Components/FilterMenu"; // Asegúrate que el nombre del archivo sea FilterMenu.jsx o .js
import NuevoNavBar from "../../Components/NuevoNavBar";
import { Link } from "react-router-dom";
import "./Home.css";

const API_URL = "http://localhost:3001/productos";

const Home = () => {
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchProducts = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            const data = await response.json();

            const transformedData = data.map(prod => ({
                id: prod.id,
                title: prod.nombre,
                price: prod.precio,
                category: prod.categoria, // Este es el campo que usaremos para las categorías
                image: prod.imagen,
                description: prod.descripcion || prod.nombre,
                stock: prod.stock
            }));
            setProducts(transformedData);

        } catch (err) {
            setError(`Error al cargar productos: ${err.message}. Asegúrate de que json-server esté corriendo y las imágenes en public/assets.`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    // Filtrado y ordenamiento
    const filteredAndSortedProducts = products
        .filter((product) => categoryFilter === "" || product.category === categoryFilter)
        .sort((a, b) => {
            if (a.title && b.title) {
                return sortOrder === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            return 0;
        });

    // *** NUEVO: Extraer categorías únicas de los productos ***
    // Se ejecuta cada vez que 'products' cambia.
    const uniqueCategories = React.useMemo(() => {
        if (products.length > 0) {
            // Usamos 'product.category' que ya está mapeado
            return Array.from(new Set(products.map(p => p.category))).filter(Boolean).sort();
        }
        return [];
    }, [products]);

    return (
        <>
            <NuevoNavBar />
            <div className="home-container">
                <main className="main-content">
                    <Carousel />
                </main>

                <div className="informacion">
                    Se requieren documentos de aduana adicionales para su destino. <a href="#">Haga click aquí para obtener más información</a>
                </div>

                {/* *** MODIFICADO: Pasar 'uniqueCategories' a FilterMenu *** */}
                <FilterMenu
                    onCategoryChange={setCategoryFilter}
                    onOrderChange={setSortOrder}
                    categories={uniqueCategories}
                    currentCategory={categoryFilter} // Para que el select muestre la categoría actual
                />

                {loading && <p style={{ textAlign: "center" }}>Cargando productos...</p>}
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                <div className="cards-section">
                    {filteredAndSortedProducts.map((prod) => (
                        <Link to={`/product/${prod.id}`} key={prod.id} className="product-card-link">
                            <ProductCard
                                image={prod.image}
                                title={prod.title}
                                description={prod.description}
                                price={prod.price}
                            />
                        </Link>
                    ))}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;
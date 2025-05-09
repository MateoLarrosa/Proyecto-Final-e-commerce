// Home.js
import React, { useState, useEffect, useCallback } from "react";
import Footer from "../../Components/Footer";
import Carousel from "../../Components/Carousel";
import ProductCard from "../../Components/ProductCard";
import FilterMenu from "../../Components/FilterMenu";
import NuevoNavBar from "../../Components/NuevoNavBar";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./Home.css";

const API_URL = "http://localhost:3001/productos";

const Home = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [sortOrder, setSortOrder] = useState("asc");
    const [categoryFilter, setCategoryFilter] = useState("");
    const [searchQuery, setSearchQuery] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Leer el parámetro de búsqueda de la URL solo al montar el componente o cuando cambia la URL
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const searchFromUrl = params.get('search') || '';
        setSearchQuery(searchFromUrl);
    }, [location.search]);

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
                category: prod.categoria,
                image: prod.imagen,
                description: prod.descripcion || prod.nombre,
                stock: prod.stock
            }));
            setProducts(transformedData);
        } catch (err) {
            setError(`Error al cargar productos: ${err.message}`);
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const filteredAndSortedProducts = products
        .filter((product) => {
            const matchesCategory = categoryFilter === "" || product.category === categoryFilter;
            const matchesSearch = searchQuery === "" || 
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.category.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            if (a.title && b.title) {
                return sortOrder === "asc"
                    ? a.title.localeCompare(b.title)
                    : b.title.localeCompare(a.title);
            }
            return 0;
        });

    const uniqueCategories = React.useMemo(() => {
        if (products.length > 0) {
            return Array.from(new Set(products.map(p => p.category))).filter(Boolean).sort();
        }
        return [];
    }, [products]);

    // Manejar la búsqueda sin actualizar la URL directamente
    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    return (
        <>
            <NuevoNavBar onSearch={handleSearch} />
            <div className="home-container">
                <main className="main-content">
                    <Carousel />
                </main>

                <div className="informacion">
                    Se requieren documentos de aduana adicionales para su destino. <a href="#">Haga click aquí para obtener más información</a>
                </div>

                <FilterMenu
                    onCategoryChange={setCategoryFilter}
                    onOrderChange={setSortOrder}
                    categories={uniqueCategories}
                    currentCategory={categoryFilter}
                />

                {loading && <p style={{ textAlign: "center" }}>Cargando productos...</p>}
                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                <div className="cards-section">
                    {filteredAndSortedProducts.length > 0 ? (
                        filteredAndSortedProducts.map((prod) => (
                            <Link to={`/product/${prod.id}`} key={prod.id} className="product-card-link">
                                <ProductCard
                                    image={prod.image}
                                    title={prod.title}
                                    description={prod.description}
                                    price={prod.price}
                                />
                            </Link>
                        ))
                    ) : (
                        <p style={{ textAlign: "center", width: "100%", padding: "20px" }}>
                            No se encontraron productos que coincidan con tu búsqueda.
                        </p>
                    )}
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Home;
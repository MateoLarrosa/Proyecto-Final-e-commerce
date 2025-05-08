import React, { useState } from "react";
import Footer from "../../Components/Footer";
import NavBar from "../../Components/NavBar";
import Carousel from "../../Components/Carousel";
import ProductCard from "../../Components/ProductCard";
import MiniCarousel from "../../Components/MiniCarousel";
import FilterMenu from "../../Components/FilterMenu";
import NuevoNavBar from "../../Components/NuevoNavBar";
import { Link } from "react-router-dom";
import "./Home.css";

import control from "../../assets/control.jpg";
import cosas from "../../assets/cosas.jpg";
import cartera from "../../assets/cartera.jpg";
import avion from "../../assets/envioInternacional.jpg";
import relojes from "../../assets/relojes.jpg";
import juguetes from "../../assets/juguetes.jpg";
import cama from "../../assets/ropa_cama.jpg";
import almacenamiento from "../../assets/almacenamiento.jpg";
import decoracion from "../../assets/decoracion.jpg";
import limpieza from "../../assets/limpieza.jpg";
import cremas from "../../assets/cremas.jpg";
import mallas from "../../assets/mallas.jpg";
import bolso from "../../assets/bolso.jpg";
import sandalias from "../../assets/sandalias.jpg";
import auricular from "../../assets/auricular.jpg";
import termo from "../../assets/termo.jpg";
import parlante from "../../assets/parlante.jpg";

const Home = () => {
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"
    const [categoryFilter, setCategoryFilter] = useState(""); // "" para todas

    const products = [
        { id: 1, image: control, title: "a", description: "Compra videojuegos", category: "electronicos" },
        { id: 2, image: avion, title: "b", description: "Haz click aqui para verificar la idoneidad", category: "electronicos" },
        { id: 3, image: cartera, title: "c", description: "Ver más", category: "para el hogar" },
        { id: 4, image: limpieza, title: "d", description: "Descubre más", category: "para el hogar" },
        { id: 5, image: cosas, title: "e", description: "Comprar ahora", category: "electronicos" },
        { id: 6, image: sandalias, title: "f", description: "Comprar mas", category: "vacacionar" },
        { id: 7, image: juguetes, title: "g", description: "Mas detalles", category: "vacacionar" },
        { id: 8, image: relojes, title: "h", description: "Mas detalles", category: "electronicos" },
        { id: 9, image: cama, title: "i", description: "Ver más detalles", category: "para el hogar" },
        { id: 10, image: almacenamiento, title: "j", description: "Compra ahora", category: "electronicos" },
        { id: 11, image: decoracion, title: "k", description: "Ver más", category: "para el hogar" },
        { id: 12, image: cremas, title: "l", description: "Compra ahora", category: "belleza" },
        { id: 13, image: mallas, title: "m", description: "Ver más detalles", category: "vacacionar" },
        { id: 14, image: bolso, title: "n", description: "Descubre más", category: "belleza" },
        { id: 15, image: auricular, title: "o", description: "Compra ahora", category: "electronicos" },
        { id: 16, image: termo, title: "p", description: "Ver más", category: "vacacionar" },
    ];

    // Filtrado y ordenamiento combinados
    const filteredAndSortedProducts = products
        .filter(product => categoryFilter === "" || product.category === categoryFilter)
        .sort((a, b) => {
            return sortOrder === "asc"
                ? a.title.localeCompare(b.title)
                : b.title.localeCompare(a.title);
        });

    return (
        <>
            <NuevoNavBar />
            <div className="home-container">
                <main className="main-content">
                    <Carousel />
                </main>

                <div className="informacion">
                    Se requieren documentos de aduana adicionales para su destino. <a> Haga click aquí para obtener más información</a>
                </div>

                {/* Nuevo menú de filtros */}
                <FilterMenu
                    onCategoryChange={setCategoryFilter}
                    onOrderChange={setSortOrder}
                />

                {/* Sección de Cards */}
                <div className="cards-section">
                    {filteredAndSortedProducts.map((prod) => (
                    <Link to={`/product/${prod.id}`} key={prod.id} className="product-card-link"> {/* Utiliza Link directamente sin div extra */}
                        <ProductCard
                            image={prod.image}
                            title={prod.title}
                            description={prod.description}
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

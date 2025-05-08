import React, { useState } from "react";
import Footer from "../../Components/Footer";
import Carousel from "../../Components/Carousel";
import ProductCard from "../../Components/ProductCard";
import MiniCarousel from "../../Components/MiniCarousel";
import FilterMenu from "../../Components/FilterMenu";
import NuevoNavBar from "../../Components/NuevoNavBar";
import { Link } from "react-router-dom";
import "./Home.css";

import osoPeluche from "../../assets/juguetes.jpg";
import auriculares from "../../assets/auricularesBeats.jpg";
import cafeteraExpres from "../../assets/CafeteraExpress.jpg";
import camisetaNike from "../../assets/camisetaNike.jpg";
import libroDaVinci from "../../assets/libroCodigoDaVinci.jpg";
import mochilaUrbana from "../../assets/MochilaUrbana.jpg";
import monitorCurvo from "../../assets/monitorCurvo.jpg";
import sillaGamer from "../../assets/SillaGamerErgonomica.jpg";
import smartWatch from "../../assets/SmartwatchDeportivoGPS.jpg";
import tecladoRGB from "../../assets/tecladoRGB.jpg";
import zapatillasRunning from "../../assets/zapatillasRunning.jpg";
import sneakers from "../../assets/sneakersMujer.jpg";
import pumaDeportivas from "../../assets/PumaDeportivas.jpg";
import underArmor from "../../assets/UnderArmor.jpg";
import bolsoCalvin from "../../assets/bolsoCalvin.jpg";
import bolsoTote from "../../assets/bolsoTote.jpg";
import mochilaRosa from "../../assets/mochilaRosa.jpg";
import camisaLino from "../../assets/camisaLino.jpg";
import camisaVestir from "../../assets/camisaVestir.jpg";
import camisaSinMangasMujer from "../../assets/camisetaSinMangaMujer.jpg";
import lampara from "../../assets/Lampara.jpg";
import soporteEsponja from "../../assets/SoporteEsponja.jpg";
import librosGot from "../../assets/LibrosGot.jpg";
import libroFrankenstein from "../../assets/libroFrankenstein.jpg";
import libroDb from "../../assets/libroDb.jpg";
import legoStarWars from "../../assets/legoStarWars.jpg";
import optimusPrime from "../../assets/optimusPrime.jpg";
import batman from "../../assets/batman.jpg";


const Home = () => {
    const [sortOrder, setSortOrder] = useState("asc"); // "asc" o "desc"
    const [categoryFilter, setCategoryFilter] = useState(""); // "" para todas

    const products = [
        { id: 1, image: auriculares, title: "Auriculares", description: "Compra videojuegos", category: "electronicos" },
        { id: 2, image: monitorCurvo, title: "Monitor curvo", description: "Haz click aqui para verificar la idoneidad", category: "electronicos" },
        { id: 3, image: tecladoRGB, title: "Teclado RGB", description: "Ver más", category: "electronicos" },
        { id: 4, image: smartWatch, title: "Smartwatch", description: "Descubre más", category: "electronicos" },

        { id: 5, image: zapatillasRunning, title: "Zapatillas de running", description: "Comprar ahora", category: "zapatillas" },
        { id: 17, image: sneakers, title: "Zapatillas de mujer", description: "Comprar ahora", category: "zapatillas" },
        { id: 18, image: pumaDeportivas, title: "Puma deportivas", description: "Comprar ahora", category: "zapatillas" },
        { id: 19, image: underArmor, title: "Under Armor", description: "Comprar ahora", category: "zapatillas" },

        { id: 6, image: camisetaNike, title: "Camiseta Nike", description: "Comprar mas", category: "ropa" },
        { id: 20, image: camisaLino, title: "Camisa de lino", description: "Comprar mas", category: "ropa" },
        {id: 21, image: camisaVestir, title: "Camisa de vestir", description: "Comprar mas", category: "ropa" },
        { id: 22, image: camisaSinMangasMujer, title: "Camisa sin mangas", description: "Comprar mas", category: "ropa" },

        { id: 7, image: libroDaVinci, title: "Libro DaVinci", description: "Mas detalles", category: "libros" },
        { id: 12, image: libroFrankenstein, title: "Libro Frankenstein", description: "Mas detalles", category: "libros" },
        { id: 13, image: libroDb, title: "Libro Dragon Ball", description: "Mas detalles", category: "libros" },
        { id: 14, image: librosGot, title: "Libro Game of Thrones", description: "Mas detalles", category: "libros" },

        { id: 8, image: osoPeluche, title: "Oso de peluche", description: "Mas detalles", category: "juguetes" },
        { id: 15, image: legoStarWars, title: "Lego Star Wars", description: "Mas detalles", category: "juguetes" },
        { id: 16, image: optimusPrime, title: "Optimus Prime", description: "Mas detalles", category: "juguetes" },
        { id: 23, image: batman, title: "Batman", description: "Mas detalles", category: "juguetes" },

        { id: 9, image: mochilaUrbana, title: "Mochila Urbana", description: "Ver más detalles", category: "mochilas" },
        { id: 24, image: bolsoCalvin, title: "Bolso Calvin Klein", description: "Ver más detalles", category: "mochilas" },
        { id: 25, image: bolsoTote, title: "Bolso Tote", description: "Ver más detalles", category: "mochilas" },
        { id: 26, image: mochilaRosa, title: "Mochila Rosa", description: "Ver más detalles", category: "mochilas" },

        { id: 10, image: sillaGamer, title: "Silla Ergonomica", description: "Compra ahora", category: "para el hogar" },
        { id: 27, image: lampara, title: "Lampara", description: "Compra ahora", category: "para el hogar" },
        { id: 29, image: soporteEsponja, title: "Soporte para esponja", description: "Compra ahora", category: "para el hogar" },
        { id: 30, image: cafeteraExpres, title: "Cafetera Express", description: "Compra ahora", category: "para el hogar" },
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

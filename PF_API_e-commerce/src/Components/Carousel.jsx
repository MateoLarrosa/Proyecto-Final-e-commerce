import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';

// Importación de imágenes locales
import AvionAmazon from '../assets/AvionAmazon.jpg';
import AmazonDiaMadre from '../assets/AmazonDiaMadre.jpg';
import AmazonJuguetes from '../assets/AmazonJuguetes.jpg';

const Carrusel = () => {
    

    return (
        <Carousel fade className="w-100"  style={{ height: "390px" }}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={AvionAmazon}
                    alt="Avión Amazon"
                    style={{ objectFit: "cover", height: "400px" }}
                />
                <Carousel.Caption className="text-dark">
                    <h3>Envíos Rápidos</h3>
                    <p>Con Amazon podés recibir tu pedido en tiempo récord.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={AmazonDiaMadre}
                    alt="Día de la Madre"
                    style={{ objectFit: "cover", height: "400px" }}
                />
                <Carousel.Caption className="text-dark">
                    <h3>Día de la Madre</h3>
                    <p>Regalá algo especial con nuestras ofertas únicas.</p>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={AmazonJuguetes}
                    alt="Juguetes"
                    style={{ objectFit: "cover", height: "400px" }}
                />
                <Carousel.Caption className="text-dark">
                    <h3>Juguetes para todos</h3>
                    <p>Diversión asegurada para los más pequeños.</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
};

export default Carrusel;
import React from "react";
import { Footer } from "../../Components/Footer"
import { NavBar } from "../../Components/NavBar"
import  Carousel  from "../../Components/Carousel"; 






const Home = () => {
    return(
        <div className="home-container">
            <NavBar/>
            <main className="main-content">
                <Carousel/>
            </main>
            
            <Footer></Footer>

        </div>
    )
}

export default Home; // Exporta el componente principal


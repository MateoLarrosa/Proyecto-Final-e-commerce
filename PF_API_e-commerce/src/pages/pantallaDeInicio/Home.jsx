import React from "react";
import Footer from "../../Components/Footer"

import NuevoNavBar from "../../Components/NuevoNavBar";
import  Carousel  from "../../Components/Carousel"; 



const Home = () => {
    return(
        <>
            <NuevoNavBar/>
            
            <div className="home-container">
                
                <main className="main-content">
                    <Carousel/>
                </main>
                
                <Footer/>

            </div>
        </>
    )
}

export default Home; // Exporta el componente principal


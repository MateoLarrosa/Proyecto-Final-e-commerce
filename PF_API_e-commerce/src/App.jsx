import './App.css';
import Catalogo from './pages/Catalogo';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import gestionProductos from './pages/gestionProductos';

function App() {
  return (
    <div id='app-container'>
      <NavBar />
        <Catalogo />
      <Footer />
    </div>
  );
}

export default App;
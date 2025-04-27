import React from 'react';
import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Login from './pages/pantallaDeInicio/Login';
import Home from './pages/pantallaDeInicio/Home';
import UserMockup from './components/UserMockup';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Login />
      {/* Si querés agregar también UserMockup, podrías ponerlo acá */}
      {/* <UserMockup /> */}
    </div>
  );
}

export default App;

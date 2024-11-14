import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import HomePage from './pages/HomePage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage'; // Importar el componente LandingPage
import './pages/styles/EstilosListas.css';
import './App.css';

function AppContent() {
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [canchas, setCanchas] = useState([
    { numero: 1, estado: 'Disponible', nombreReserva: '', descripcion: 'Cancha de fútbol 11' },
    { numero: 2, estado: 'Disponible', nombreReserva: '', descripcion: 'Cancha de césped sintético' },
    { numero: 3, estado: 'Disponible', nombreReserva: '', descripcion: 'Cancha de fútbol rápido' },
    { numero: 4, estado: 'Disponible', nombreReserva: '', descripcion: 'Cancha' },
    { numero: 5, estado: 'Disponible', nombreReserva: '', descripcion: 'Cancha picada' },
    { numero: 6, estado: 'Disponible', nombreReserva: '', descripcion: 'Cancha god' },
  ]);

  useEffect(() => {
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
  };

  const actualizarEstado = (numeroCancha, nuevoEstado, nuevoNombreReserva, nuevaDescripcion = null) => {
    setCanchas((prevCanchas) =>
      prevCanchas.map((cancha) =>
        cancha.numero === numeroCancha
          ? {
              ...cancha,
              estado: nuevoEstado,
              nombreReserva: nuevoNombreReserva,
              descripcion: nuevaDescripcion !== null ? nuevaDescripcion : cancha.descripcion,
            }
          : cancha
      )
    );
  };

  const agregarCancha = (nuevaCancha) => {
    setCanchas((prevCanchas) => [...prevCanchas, nuevaCancha]);
  };

  const eliminarCancha = (numeroCancha) => {
    setCanchas((prevCanchas) => prevCanchas.filter((cancha) => cancha.numero !== numeroCancha));
  };

  return (
    <>
      {/* Fondo de gradiente detrás del contenido principal */}
      <div className="app-background"></div>

      {/* Mostrar el navbar solo si la ruta no es "/" */}
      {location.pathname !== '/' && (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">CANCHAS</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav ms-auto">
        <li className="nav-item">
          <Link className="nav-link" to="/home">Inicio</Link>
        </li>
        <li className="nav-item">
          {isAuthenticated ? (
            <Link className="nav-link" to="/admin">Gestión</Link>
          ) : (
            <Link className="nav-link" to="/login">Iniciar Sesión</Link>
          )}
        </li>
      </ul>
      {isAuthenticated && (
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button onClick={handleLogout} className="btn btn-outline-light">Cerrar sesión</button>
          </li>
        </ul>
      )}
    </div>
  </div>
</nav>


      )}

      <div className="container mt-4">
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location}>
              <Route path="/" element={<LandingPage />} />
              <Route path="/home" element={<HomePage canchas={canchas} actualizarEstado={actualizarEstado} />} />
              <Route path="/admin" element={isAuthenticated ? <AdminPage canchas={canchas} actualizarEstado={actualizarEstado} agregarCancha={agregarCancha} eliminarCancha={eliminarCancha} /> : <LoginPage onLogin={handleLogin} />} />
              <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

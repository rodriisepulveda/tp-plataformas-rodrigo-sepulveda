import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import './styles/LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page-container">
      {/* Fondo sutil de gradiente oscuro */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="background-overlay"
      />

      {/* Título animado */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
        className="landing-title"
      >
        Bienvenido a Canchitas!
      </motion.h1>

      {/* Texto de bienvenida */}
      <motion.p
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
        className="landing-text"
      >
        ¡Reserva tu cancha para disfrutar con tus amigos!
      </motion.p>

      {/* Botón con animación */}
      <motion.button
        onClick={() => navigate('/home')}
        className="landing-button"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{
          scale: 1.07,
          backgroundColor: "#303036",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.4)",
        }}
        transition={{ duration: 0.4 }}
      >
        Ir a la Página Principal
      </motion.button>
    </div>
  );
}

export default LandingPage;

import React from 'react';
import './styles/AdminPage.css';
import FormularioAgregarCancha from './FormularioAgregarCancha';
import ListaCanchasAdmin from './ListaCanchasAdmin';

function AdminPage({ canchas, agregarCancha, actualizarEstado, eliminarCancha }) {
  return (
    <div className="admin-page-container">
      {/* Fondo de gradiente exclusivo para AdminPage */}
      <div className="admin-page-background"></div>

      {/* Lista de Canchas */}
      <div className="canchas-list">
        <ListaCanchasAdmin canchas={canchas} actualizarEstado={actualizarEstado} eliminarCancha={eliminarCancha} />
      </div>
      
      {/* Formulario para agregar cancha */}
      <div className="agregar-cancha-form">
        <FormularioAgregarCancha canchas={canchas} agregarCancha={agregarCancha} />
      </div>
    </div>
  );
}

export default AdminPage;

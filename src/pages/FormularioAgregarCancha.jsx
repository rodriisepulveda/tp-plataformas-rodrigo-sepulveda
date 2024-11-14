import React, { useState } from 'react';
import './styles/FormularioAgregarCancha.css';

function FormularioAgregarCancha({ canchas, agregarCancha }) {
  const [nuevaCancha, setNuevaCancha] = useState({
    numero: '',
    estado: 'Disponible',
    descripcion: '',
  });
  const [error, setError] = useState('');

  const manejarNuevaCancha = (e) => {
    const { name, value } = e.target;
    setNuevaCancha((prev) => ({
      ...prev,
      [name]: value.toString(),
    }));
  };

  const agregarNuevaCancha = () => {
    const numeroCancha = parseInt(nuevaCancha.numero, 10);
  
    // Verificar si ya existe una cancha con el mismo número
    const canchaExiste = canchas.some((cancha) => cancha.numero === numeroCancha);
  
    if (canchaExiste) {
      setError(`La cancha con el número ${nuevaCancha.numero} ya existe.`);
    } else if (numeroCancha <= 0) {
      setError('El número de la cancha debe ser mayor a 0.');
    } else if (!nuevaCancha.descripcion.trim()) {
      setError('La descripción es obligatoria.');
    } else {
      // Agregar la nueva cancha con la descripción correctamente pasada
      agregarCancha({
        numero: numeroCancha,
        estado: nuevaCancha.estado, // Estado 'Disponible' predeterminado
        descripcion: nuevaCancha.descripcion.trim(), // Descripción del formulario
        nombreReserva: '' // Asumimos que no hay reserva al crear una cancha
      });
  
      setNuevaCancha({ numero: '', estado: 'Disponible', descripcion: '' });
      setError(''); // Limpiar el error si se agrega correctamente
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-body">
        <h5 className="card-title">Agregar Nueva Cancha</h5>
        <div className="form-group">
          <input
            name="numero"
            type="number"
            value={nuevaCancha.numero}
            placeholder="Número de Cancha"
            onChange={manejarNuevaCancha}
            className="form-control"
            min="1" // Evitar valores negativos en la entrada
          />
        </div>
        <div className="form-group">
          <input
            name="descripcion"
            value={nuevaCancha.descripcion}
            placeholder="Descripción"
            onChange={manejarNuevaCancha}
            className="form-control"
          />
        </div>
        {error && <p className="text-danger">{error}</p>} {/* Mostrar el error si existe */}
        <button onClick={agregarNuevaCancha} className="btn btn-primary">
          Agregar Cancha
        </button>
      </div>
    </div>
  );
}

export default FormularioAgregarCancha;

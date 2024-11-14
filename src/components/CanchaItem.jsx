import React, { useEffect, useState } from 'react';

function CanchaItem({ numero, estado, nombreReserva, descripcion, actualizarEstado }) {
  const [tiempoRestante, setTiempoRestante] = useState(null);

  const reservarCancha = () => {
    const nombre = prompt('Por favor, ingrese su nombre:');
    if (nombre) {
      actualizarEstado(numero, 'Ocupada', nombre);
      setTiempoRestante(90 * 60); 
    }
  };

  const cancelarReserva = () => {
    actualizarEstado(numero, 'Disponible', '');
    setTiempoRestante(null);
  };

  useEffect(() => {
    let timer;
    if (estado === 'Ocupada' && tiempoRestante > 0) {
      timer = setInterval(() => {
        setTiempoRestante((prevTiempo) => prevTiempo - 1);
      }, 1000);
    } else if (tiempoRestante === 0) {
      cancelarReserva(); 
    }

    return () => clearInterval(timer);
  }, [estado, tiempoRestante]);

  const mostrarTiempoRestante = () => {
    const minutos = Math.floor(tiempoRestante / 60);
    const segundos = tiempoRestante % 60;
    return `${minutos} minutos y ${segundos} segundos restantes`;
  };

  return (
    <div>
      <h3>Cancha {numero}</h3>
      <p>Estado: {estado}</p>
      <p>Descripción: {descripcion}</p>

      {estado === 'Disponible' && (
        <button onClick={reservarCancha}>Reservar</button>
      )}

      {estado === 'Ocupada' && (
        <div>
          <p>Reservado por: {nombreReserva}</p>
          {tiempoRestante !== null && <p>{mostrarTiempoRestante()}</p>}
          <button onClick={cancelarReserva}>Cancelar Reserva</button>
        </div>
      )}
    </div>
  );
}

export default CanchaItem;

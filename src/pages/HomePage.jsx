import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './styles/EstilosListas.css';

function HomePage({ canchas, actualizarEstado }) {
  const [nombreReserva, setNombreReserva] = useState('');
  const [canchaSeleccionada, setCanchaSeleccionada] = useState(null);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('');

  const manejarReserva = (numeroCancha) => {
    if (nombreReserva) {
      actualizarEstado(numeroCancha, 'Ocupada', nombreReserva);
      setNombreReserva('');
      setCanchaSeleccionada(null);
      mostrarNotificacion('Cancha reservada con éxito', 'exito');
    } else {
      mostrarNotificacion('Por favor, ingrese un nombre para reservar', 'error');
    }
  };

  const mostrarNotificacion = (mensaje, tipo) => {
    setMensaje(mensaje);
    setTipoMensaje(tipo);
    setTimeout(() => setMensaje(''), 3000);
  };

  const seleccionarCancha = (numeroCancha) => {
    setCanchaSeleccionada(numeroCancha);
  };

  const cancelarSeleccion = () => {
    setCanchaSeleccionada(null);
    setNombreReserva('');
  };

  return (
    <div>
      <h1 className="text-center mb-4">Lista de Canchas</h1>
      <p class='t1'><b>Selecciona la cancha que deseas reservar.</b></p>
      {canchas.length === 0 ? (
        <p className="text-center text-danger">No hay canchas disponibles por el momento.</p>
      ) : (
        <div className="cards-container">
          {canchas.map((cancha) => (
            <div key={cancha.numero} className="card">
              <div className="card-body">
                <h3 className="card-title">Cancha {cancha.numero}</h3>
                <p className="card-text"><strong>Estado:</strong> {cancha.estado}</p>
                <p className="card-text"><strong>Descripción:</strong> {cancha.descripcion}</p>
                <p className="card-text"><strong>Reservado por:</strong> {cancha.nombreReserva || 'Nadie'}</p>
                {cancha.estado === 'Disponible' ? (
                  canchaSeleccionada === cancha.numero ? (
                    <div className="confirmar-cancelar-container">
                      <input
                        required
                        type="text"
                        className="form-control mb-2"
                        placeholder="Ingrese su nombre"
                        value={nombreReserva}
                        onChange={(e) => setNombreReserva(e.target.value)}
                      />
                      <div className="botones-confirmar-cancelar">
                        <button className="btn btn-success" onClick={() => manejarReserva(cancha.numero)}>
                          Confirmar Reserva
                        </button>
                        <FaTimes
                          className="cancel-icon"
                          onClick={cancelarSeleccion}
                          title="Cancelar"
                        />
                      </div>
                    </div>
                  ) : (
                    <button className="btn btn-primary" onClick={() => seleccionarCancha(cancha.numero)}>
                      Reservar
                    </button>
                  )
                ) : (
                  <p className="text-danger">CANCHA RESERVADA.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {mensaje && (
        <div className="notificacion-container">
          <div className={`notificacion ${tipoMensaje} fade-in-out`}>
            {mensaje}
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;

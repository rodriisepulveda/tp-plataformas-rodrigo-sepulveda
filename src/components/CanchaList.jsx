import React from 'react';
import CanchaItem from './CanchaItem';

function CanchaList({ canchas, actualizarEstado }) {
  return (
    <div>
      {canchas.map((cancha) => (
        <CanchaItem
          key={cancha.numero}
          numero={cancha.numero}
          estado={cancha.estado}
          nombreReserva={cancha.nombreReserva}
          actualizarEstado={actualizarEstado}
        />
      ))}
    </div>
  );
}

export default CanchaList;

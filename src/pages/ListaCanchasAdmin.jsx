import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { FaTrash, FaCheck, FaEdit, FaTimes } from "react-icons/fa";
import { MdEventBusy, MdEventAvailable } from "react-icons/md";
import { Badge } from "react-bootstrap";
import './styles/EstilosListas.css';

function ListaCanchasAdmin({ canchas, actualizarEstado, eliminarCancha }) {
  const [descripciones, setDescripciones] = useState(
    canchas.reduce(
      (acc, cancha) => ({ ...acc, [cancha.numero]: cancha.descripcion }),
      {}
    )
  );
  const [editando, setEditando] = useState({});
  const [confirmarEliminacion, setConfirmarEliminacion] = useState(null);

  const manejarDescripcion = (numero, nuevaDescripcion) => {
    setDescripciones((prevDescripciones) => ({
      ...prevDescripciones,
      [numero]: nuevaDescripcion,
    }));
  };

  const guardarDescripcion = (numero) => {
    const cancha = canchas.find((c) => c.numero === numero);
    const nuevaDescripcion = descripciones[numero];
    actualizarEstado(
      numero,
      cancha.estado,
      cancha.nombreReserva,
      nuevaDescripcion
    );
    setEditando((prev) => ({ ...prev, [numero]: false })); // Salir del modo edición
  };

  const habilitarEdicion = (numero) => {
    setEditando((prev) => ({ ...prev, [numero]: true }));
  };

  const solicitarConfirmacion = (numero) => {
    setConfirmarEliminacion(numero);
  };

  const confirmarEliminacionCancha = (numero) => {
    eliminarCancha(numero);
    setConfirmarEliminacion(null);
  };

  const cancelarEliminacion = () => {
    setConfirmarEliminacion(null);
  };

  return (
    <div className="container mt-4">
      <Row>
        {canchas.map((cancha) => (
          <Col key={cancha.numero} md={4} className="mb-4">
            <Card className="h-100">
              <Card.Body>
                <Card.Title>Cancha {cancha.numero}</Card.Title>
                <Card.Text>
                  <strong>Estado:</strong> {cancha.estado}
                </Card.Text>

                <Card.Text>
                  <strong>Descripción: </strong>
                  {editando[cancha.numero] ? (
                    <input
                      type="text"
                      className="form-control"
                      value={descripciones[cancha.numero] || ""}
                      onChange={(e) => manejarDescripcion(cancha.numero, e.target.value)}
                    />
                  ) : (
                    descripciones[cancha.numero] || cancha.descripcion
                  )}
                </Card.Text>
                
                <Card.Text>
                  <strong>Reservado por:</strong>{" "}
                  {cancha.nombreReserva ? (
                    <Badge bg="success" text="light">
                      {cancha.nombreReserva}
                    </Badge>
                  ) : (
                    <Badge bg="danger" text="light">Nadie</Badge>
                  )}
                </Card.Text>
              </Card.Body>

              <Card.Footer className="d-flex justify-content-between align-items-center">
                <div>
                  {cancha.estado === "Disponible" ? (
                    <MdEventBusy
                      className="text-warning"
                      style={{ cursor: "pointer" }}
                      title="Marcar como OCUPADA"
                      onClick={() => actualizarEstado(cancha.numero, "Ocupada", "Admin")}
                    />
                  ) : (
                    <MdEventAvailable
                      className="text-success"
                      style={{ cursor: "pointer" }}
                      title="Marcar como DISPONIBLE"
                      onClick={() => actualizarEstado(cancha.numero, "Disponible", "")}
                    />
                  )}
                </div>

                {editando[cancha.numero] ? (
                  <FaCheck
                    className="text-success"
                    style={{ cursor: "pointer" }}
                    title="Confirmar Edición"
                    onClick={() => guardarDescripcion(cancha.numero)}
                  />
                ) : (
                  <FaEdit
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    title="Editar Descripción"
                    onClick={() => habilitarEdicion(cancha.numero)}
                  />
                )}

                {confirmarEliminacion === cancha.numero ? (
                  <div className="text-center">
                    <p className="text-danger">¿Eliminar esta cancha?</p>
                    <FaCheck
                      className="text-danger"
                      style={{ cursor: "pointer", marginRight: "10px" }}
                      title="Confirmar Eliminación"
                      onClick={() => confirmarEliminacionCancha(cancha.numero)}
                    />
                    <FaTimes
                      className="text-secondary"
                      style={{ cursor: "pointer" }}
                      title="Cancelar"
                      onClick={cancelarEliminacion}
                    />
                  </div>
                ) : (
                  <FaTrash
                    className="text-danger"
                    style={{ cursor: "pointer" }}
                    title="Eliminar cancha"
                    onClick={() => solicitarConfirmacion(cancha.numero)}
                  />
                )}
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default ListaCanchasAdmin;

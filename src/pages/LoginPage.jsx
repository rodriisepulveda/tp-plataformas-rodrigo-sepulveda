import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/LoginPage.css';

function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === '1234') {
      onLogin();
      navigate('/admin');
    } else {
      setError('Credenciales inválidas. Inténtalo nuevamente.');
    }
  };

  return (
    <div className="login-page-background">
      <div className="wrapper fadeInDown">
        <div id="formContent">
          <h2 className="active">Entrar a Gestión</h2>
          <div className="fadeIn first"></div>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className="fadeIn second"
              placeholder="Usuario"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              className="fadeIn third"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <input type="submit" className="fadeIn fourth" value="Ingresar" />
          </form>
          {error && <p className="text-danger">{error}</p>}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;

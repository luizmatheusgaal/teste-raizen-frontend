import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [role, setRole] = useState('client');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (role === 'door') navigate('/validar');
    else if (role === 'organizer') navigate('/organizador');
    else navigate('/meus-ingressos');
  };

  return (
    <section className="section" style={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ marginBottom: '8px' }}>Bem-vindo de volta</h2>
            <p className="text-muted text-sm">Entre como Cliente, Organizador ou Portaria</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input className="form-input" type="email" placeholder="voce@email.com" required />
            </div>
            <div className="form-group">
              <label className="form-label">Senha</label>
              <input className="form-input" type="password" placeholder="••••••••" required />
            </div>
            <div className="form-group">
              <label className="form-label">Perfil de acesso</label>
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="client">Cliente</option>
                <option value="organizer">Organizador</option>
                <option value="door">Portaria</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full" style={{ margin: '8px 0 16px' }}>
              Entrar
            </button>
          </form>

          <p className="text-center text-sm text-muted" style={{ textAlign: 'center' }}>
            Não tem conta? <a href="#">Cadastre-se</a>
          </p>
        </div>
      </div>
    </section>
  );
}

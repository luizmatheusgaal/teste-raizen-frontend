import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Login() {
  const [isRegister, setIsRegister] = useState(false);
  const [role, setRole] = useState('client');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let user;
      if (isRegister) {
        user = await register({
          email,
          username: email,
          first_name: firstName,
          last_name: lastName,
          password,
          role,
        });
      } else {
        user = await login(email, password);
      }

      if (user.role === 'door') navigate('/validar');
      else if (user.role === 'organizer') navigate('/organizador');
      else navigate('/meus-ingressos');
    } catch (err) {
      setError(err.message || 'Erro ao autenticar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section" style={{ display: 'flex', alignItems: 'center', minHeight: 'calc(100vh - 200px)' }}>
      <div className="container" style={{ maxWidth: '440px' }}>
        <div className="card" style={{ padding: '40px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <h2 style={{ marginBottom: '8px' }}>{isRegister ? 'Criar conta' : 'Bem-vindo de volta'}</h2>
            <p className="text-muted text-sm">Entre como Cliente, Organizador ou Portaria</p>
          </div>

          {error && (
            <div className="card" style={{ padding: '12px 16px', marginBottom: '16px', background: 'rgba(244, 63, 94, 0.1)', color: 'var(--color-danger)' }}>
              <p className="text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className="grid grid-2" style={{ gap: '12px' }}>
                <div className="form-group">
                  <label className="form-label">Nome</label>
                  <input className="form-input" type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Sobrenome</label>
                  <input className="form-input" type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
              </div>
            )}
            <div className="form-group">
              <label className="form-label">E-mail</label>
              <input className="form-input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Senha</label>
              <input className="form-input" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Perfil de acesso</label>
              <select className="form-select" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="client">Cliente</option>
                <option value="organizer">Organizador</option>
                <option value="door">Portaria</option>
              </select>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full" style={{ margin: '8px 0 16px' }} disabled={loading}>
              {loading ? 'Aguarde...' : isRegister ? 'Cadastrar' : 'Entrar'}
            </button>
          </form>

          <p className="text-center text-sm text-muted" style={{ textAlign: 'center' }}>
            {isRegister ? 'Já tem conta?' : 'Não tem conta?'}{' '}
            <button type="button" onClick={() => setIsRegister(!isRegister)} className="btn btn-ghost btn-sm" style={{ padding: 0, display: 'inline' }}>
              {isRegister ? 'Entrar' : 'Cadastre-se'}
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

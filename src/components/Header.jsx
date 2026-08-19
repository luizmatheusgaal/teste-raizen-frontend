import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.js';

export default function Header() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const isDoor = location.pathname === '/validar';
  const isOrganizer = ['/organizador', '/criar-evento'].includes(location.pathname);

  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">Verzel<span>.</span></Link>
        <div className="search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#64748B" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
          <input type="text" placeholder="Buscar eventos, shows, filmes..." />
        </div>
        <div className="nav-actions">
          {isOrganizer && <Link to="/criar-evento" className="btn btn-ghost">Criar evento</Link>}
          {isDoor && <span className="text-sm text-muted">Portaria — Arena Verzel</span>}
          {user ? (
            <>
              <span className="text-sm text-muted">{user.first_name || user.email}</span>
              <button onClick={logout} className="btn btn-ghost">Sair</button>
            </>
          ) : (
            <Link to="/login" className="btn btn-primary">Entrar</Link>
          )}
        </div>
      </div>
    </header>
  );
}

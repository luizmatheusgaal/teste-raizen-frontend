import { Link, useLocation } from 'react-router-dom';

export default function Header({ role = 'guest' }) {
  const location = useLocation();
  const isDoor = location.pathname === '/validar';

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
          {role === 'organizer' && <Link to="/criar-evento" className="btn btn-ghost">Criar evento</Link>}
          {isDoor && <span className="text-sm text-muted">Portaria — Arena Verzel</span>}
          <Link to="/login" className="btn btn-primary">Entrar</Link>
        </div>
      </div>
    </header>
  );
}

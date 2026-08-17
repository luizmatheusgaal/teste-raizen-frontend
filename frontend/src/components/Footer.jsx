import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link to="/" className="logo" style={{ marginBottom: '16px', display: 'inline-block' }}>Verzel<span>.</span></Link>
          <p className="text-muted text-sm">Plataforma de eventos e ingressos com experiência completa do organizador à portaia.</p>
        </div>
        <div>
          <h4 className="footer-title">Compradores</h4>
          <ul className="footer-links">
            <li><a href="#">Como comprar</a></li>
            <li><Link to="/meus-ingressos">Meus ingressos</Link></li>
            <li><a href="#">Central de ajuda</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Organizadores</h4>
          <ul className="footer-links">
            <li><Link to="/criar-evento">Criar evento</Link></li>
            <li><Link to="/organizador">Painel</Link></li>
            <li><a href="#">API</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer-title">Verzel</h4>
          <ul className="footer-links">
            <li><a href="#">Sobre</a></li>
            <li><a href="#">Termos</a></li>
            <li><a href="#">Privacidade</a></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}

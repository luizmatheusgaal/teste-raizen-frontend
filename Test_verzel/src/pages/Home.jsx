import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { events, categories } from '../data/events';

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Descubra o que fazer perto de você</h1>
          <p>Shows, filmes, teatros e experiências. Reserve seu lugar e receba seu ingresso com QR.</p>
          <div className="flex gap-4 mt-6">
            <Link to="/eventos" className="btn btn-lg" style={{ background: 'white', color: 'var(--color-primary)' }}>
              Explorar eventos
            </Link>
            <Link to="/login" className="btn btn-ghost" style={{ color: 'white' }}>
              Sou organizador
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Eventos em destaque</h2>
              <p className="text-muted text-sm">Os mais comprados nas últimas 24 horas</p>
            </div>
            <Link to="/eventos" className="btn btn-ghost">Ver todos</Link>
          </div>
          <div className="grid grid-4">
            {events.map(event => (
              <Link to={`/eventos/${event.id}`} key={event.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                <EventCard event={event} />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'var(--color-surface)', borderTop: '1px solid var(--color-border)' }}>
        <div className="container">
          <div className="section-header">
            <div>
              <h2>Navegue por categoria</h2>
              <p className="text-muted text-sm">Encontre o evento ideal para você</p>
            </div>
          </div>
          <div className="grid grid-4">
            {categories.map(cat => (
              <div className="card" key={cat.name} style={{ padding: '24px', textAlign: 'center' }}>
                <h4 style={{ marginBottom: '4px' }}>{cat.name}</h4>
                <p className="text-muted text-sm">{cat.count} eventos</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

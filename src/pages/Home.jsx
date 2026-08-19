import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EventCard from '../components/EventCard';
import { api } from '../services/api.js';
import { categories as staticCategories } from '../data/events';

export default function Home() {
  const [events, setEvents] = useState([]);
  const [categories, setCategories] = useState(staticCategories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.listEvents('?status=published');
        setEvents(data.results || data);
        const catData = await api.listCategories();
        if (catData.results?.length || catData.length) {
          setCategories(catData.results || catData);
        }
      } catch {
        // errors are shown by the global toast
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <>
      <section className="hero">
        <div className="container">
          <h1>Descubra o que fazer perto de você</h1>
          <p>Shows, filmes, teatros e experiências. Reserve seu lugar e receba seu ingresso com QR.</p>
          <div className="flex gap-4 mt-6">
            <Link to="/" className="btn btn-lg" style={{ background: 'white', color: 'var(--color-primary)' }}>
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
            <Link to="/" className="btn btn-ghost">Ver todos</Link>
          </div>

          {loading ? (
            <p className="text-muted">Carregando eventos...</p>
          ) : (
            <div className="grid grid-4">
              {events.map(event => (
                <Link to={`/eventos/${event.id}`} key={event.id} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <EventCard event={event} />
                </Link>
              ))}
            </div>
          )}
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
              <div className="card" key={cat.name || cat.slug} style={{ padding: '24px', textAlign: 'center' }}>
                <h4 style={{ marginBottom: '4px' }}>{cat.name}</h4>
                <p className="text-muted text-sm">{cat.count || cat.events?.length || 0} eventos</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

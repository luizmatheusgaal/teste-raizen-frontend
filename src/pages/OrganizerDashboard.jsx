import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api.js';
import { useAuth } from '../hooks/useAuth.js';
import { formatDate } from '../services/format.js';

export default function OrganizerDashboard() {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const data = await api.listEvents();
        const all = data.results || data;
        setEvents(all.filter(e => e.organizer === user?.id));
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [user]);

  const totalSold = events.reduce((acc, e) => acc + (e.sold || 0), 0);
  const totalCapacity = events.reduce((acc, e) => acc + (e.capacity || 0), 0);
  const revenue = events.reduce((acc, e) => acc + (e.revenue || 0), 0);

  const stats = [
    { label: 'Eventos publicados', value: events.filter(e => e.status === 'published').length },
    { label: 'Ingressos vendidos', value: totalSold },
    { label: 'Receita bruta', value: `R$ ${revenue.toLocaleString('pt-BR')}` },
    { label: 'Taxa de validação', value: totalCapacity ? `${Math.round((totalSold / totalCapacity) * 100)}%` : '0%' }
  ];

  if (loading) return <section className="section"><div className="container"><p className="text-muted">Carregando...</p></div></section>;
  if (error) return <section className="section"><div className="container"><p className="text-danger">{error}</p></div></section>;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h1>Painel do organizador</h1>
            <p className="text-muted text-sm">Acompanhe seus eventos e vendas</p>
          </div>
        </div>

        <div className="grid grid-4" style={{ marginBottom: '32px' }}>
          {stats.map(stat => (
            <div className="card" key={stat.label} style={{ padding: '24px', textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-display)', fontSize: '32px', fontWeight: 800, color: 'var(--color-primary)' }}>{stat.value}</div>
              <div className="text-muted text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <div className="flex justify-between items-center" style={{ marginBottom: '24px' }}>
            <h3>Meus eventos</h3>
            <Link to="/criar-evento" className="btn btn-primary btn-sm">Criar evento</Link>
          </div>

          <table className="w-full" style={{ borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--color-border)', textAlign: 'left', color: 'var(--color-text-muted)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <th style={{ padding: '12px 0' }}>Evento</th>
                <th style={{ padding: '12px 0' }}>Data</th>
                <th style={{ padding: '12px 0' }}>Ingressos</th>
                <th style={{ padding: '12px 0' }}>Status</th>
                <th style={{ padding: '12px 0', textAlign: 'right' }}>Ações</th>
              </tr>
            </thead>
            <tbody>
              {events.map(event => (
                <tr key={event.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '16px 0' }}>
                    <strong>{event.title}</strong>
                    <p className="text-muted text-sm">{event.venue?.city}, {event.venue?.state}</p>
                  </td>
                  <td style={{ padding: '16px 0' }}>{formatDate(event.starts_at)}</td>
                  <td style={{ padding: '16px 0' }}>{event.sold ?? 0} / {event.capacity ?? '—'}</td>
                  <td style={{ padding: '16px 0' }}>
                    <span className={`badge ${event.status === 'published' ? 'badge-success' : 'badge-primary'}`}>
                      {event.status === 'published' ? 'Publicado' : 'Rascunho'}
                    </span>
                  </td>
                  <td style={{ padding: '16px 0', textAlign: 'right' }}>
                    <Link to={`/eventos/${event.id}`} className="btn btn-ghost btn-sm">Editar</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {events.length === 0 && <p className="text-muted text-center mt-4">Nenhum evento criado ainda.</p>}
        </div>
      </div>
    </section>
  );
}

import { Link } from 'react-router-dom';
import { organizerEvents } from '../data/events';

const stats = [
  { label: 'Eventos publicados', value: '5' },
  { label: 'Ingressos vendidos', value: '1.240' },
  { label: 'Receita bruta', value: 'R$ 89K' },
  { label: 'Taxa de validação', value: '98%' }
];

export default function OrganizerDashboard() {
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
            <select className="form-select" style={{ width: '140px' }}>
              <option>Todos</option>
              <option>Publicados</option>
              <option>Rascunho</option>
            </select>
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
              {organizerEvents.map(event => (
                <tr key={event.id} style={{ borderBottom: '1px solid var(--color-border)' }}>
                  <td style={{ padding: '16px 0' }}>
                    <strong>{event.title}</strong>
                    <p className="text-muted text-sm">{event.location}</p>
                  </td>
                  <td style={{ padding: '16px 0' }}>{event.date}</td>
                  <td style={{ padding: '16px 0' }}>{event.capacity ? `${event.sold} / ${event.capacity}` : '—'}</td>
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
        </div>
      </div>
    </section>
  );
}

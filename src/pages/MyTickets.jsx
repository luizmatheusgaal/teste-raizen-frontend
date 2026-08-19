import { useEffect, useState } from 'react';
import { api } from '../services/api.js';
import { formatFullDate, formatTime } from '../services/format.js';

function QRCode({ used }) {
  return (
    <svg
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill={used ? '#94a3b8' : '#1e293b'}
      style={{ opacity: used ? 0.5 : 1 }}
    >
      <rect x="0" y="0" width="32" height="32" />
      <rect x="64" y="0" width="32" height="32" />
      <rect x="0" y="64" width="32" height="32" />
      <rect x="40" y="40" width="16" height="16" />
      <rect x="64" y="64" width="12" height="12" />
      <rect x="84" y="64" width="12" height="12" />
      <rect x="64" y="84" width="12" height="12" />
      <rect x="84" y="84" width="12" height="12" />
    </svg>
  );
}

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.listTickets();
        setTickets(data.results || data);
      } catch {
        // errors are shown by the global toast
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <section className="section"><div className="container"><p className="text-muted">Carregando ingressos...</p></div></section>;

  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h1>Meus ingressos</h1>
            <p className="text-muted text-sm">Ingressos ativos e histórico de compras</p>
          </div>
        </div>

        {tickets.length === 0 && <p className="text-muted">Você ainda não possui ingressos.</p>}

        {tickets.map(ticket => {
          const used = ticket.status === 'used';
          const event = ticket.ticket_type?.event;
          return (
            <div className="card" key={ticket.id} style={{ padding: '24px', marginBottom: '24px', opacity: used ? 0.7 : 1 }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`badge ${!used ? 'badge-success' : 'badge-danger'}`}>
                      {!used ? 'Válido' : 'Utilizado'}
                    </span>
                    <span className="text-xs text-muted">Código: {ticket.code}</span>
                  </div>
                  <h3>{event?.title || 'Evento'}</h3>
                  <p className="text-muted text-sm mt-4">{formatFullDate(event?.starts_at)} • {formatTime(event?.starts_at)}</p>
                  <p className="text-muted text-sm">{event?.venue?.city}, {event?.venue?.state} • {event?.venue?.name}</p>
                  <p className="text-sm mt-4"><strong>Setor:</strong> {ticket.ticket_type?.name} • <strong>Lugar:</strong> {ticket.seat || 'Livre'}</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <QRCode code={ticket.code} used={used} />
                  {!used && <p className="text-xs text-muted" style={{ marginTop: '8px' }}>Apresente na portaria</p>}
                </div>
              </div>
              {!used && (
                <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '20px', paddingTop: '16px', display: 'flex', gap: '12px' }}>
                  <button className="btn btn-secondary btn-sm">Compartilhar ingresso</button>
                  <button className="btn btn-ghost btn-sm">Baixar PDF</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

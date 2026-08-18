import { userTickets } from '../data/events';

function QRCode({ code, used }) {
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
  return (
    <section className="section">
      <div className="container">
        <div className="section-header">
          <div>
            <h1>Meus ingressos</h1>
            <p className="text-muted text-sm">Ingressos ativos e histórico de compras</p>
          </div>
        </div>

        {userTickets.map(ticket => (
          <div className="card" key={ticket.id} style={{ padding: '24px', marginBottom: '24px', opacity: ticket.status === 'used' ? 0.7 : 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '24px', alignItems: 'center' }}>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className={`badge ${ticket.status === 'valid' ? 'badge-success' : 'badge-danger'}`}>
                    {ticket.status === 'valid' ? 'Válido' : 'Utilizado'}
                  </span>
                  <span className="text-xs text-muted">Código: {ticket.id}</span>
                </div>
                <h3>{ticket.eventTitle}</h3>
                <p className="text-muted text-sm mt-4">{ticket.date} • {ticket.time}</p>
                <p className="text-muted text-sm">{ticket.location} • {ticket.venue}</p>
                <p className="text-sm mt-4"><strong>Setor:</strong> {ticket.sector} • <strong>Lugar:</strong> {ticket.seat}</p>
              </div>
              <div style={{ textAlign: 'center' }}>
                <QRCode code={ticket.id} used={ticket.status === 'used'} />
                {ticket.status === 'valid' && <p className="text-xs text-muted" style={{ marginTop: '8px' }}>Apresente na portaia</p>}
              </div>
            </div>
            {ticket.status === 'valid' && (
              <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '20px', paddingTop: '16px', display: 'flex', gap: '12px' }}>
                <button className="btn btn-secondary btn-sm">Compartilhar ingresso</button>
                <button className="btn btn-ghost btn-sm">Baixar PDF</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

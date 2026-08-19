import { useEffect, useRef, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { api } from '../services/api.js';
import { formatFullDate, formatTime } from '../services/format.js';

function TicketQR({ code, used, canvasRef }) {
  return (
    <QRCodeCanvas
      ref={canvasRef}
      value={code}
      size={128}
      bgColor={used ? '#f1f5f9' : '#ffffff'}
      fgColor={used ? '#94a3b8' : '#1e293b'}
      level="M"
      style={{ opacity: used ? 0.5 : 1, borderRadius: '8px' }}
    />
  );
}

export default function MyTickets() {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const canvasRefs = useRef({});

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

  const handleDownload = (ticket) => {
    const canvas = canvasRefs.current[ticket.id];
    if (!canvas) return;

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = `ingresso-${ticket.code}.png`;
    link.click();
  };

  const handleShare = async (ticket) => {
    const event = ticket.ticket_type?.event;
    const text = `Ingresso para ${event?.title || 'evento'}\nCódigo: ${ticket.code}\nSetor: ${ticket.ticket_type?.name}\n${formatFullDate(event?.starts_at)}`;

    if (navigator.share) {
      try {
        await navigator.share({ title: 'Meu ingresso', text });
        return;
      } catch {
        // fall through to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(text);
      alert('Código do ingresso copiado!');
    } catch {
      // ignore
    }
  };

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
                  <TicketQR code={ticket.code} used={used} canvasRef={el => { canvasRefs.current[ticket.id] = el; }} />
                  {!used && <p className="text-xs text-muted" style={{ marginTop: '8px' }}>Apresente na portaria</p>}
                </div>
              </div>
              {!used && (
                <div style={{ borderTop: '1px solid var(--color-border)', marginTop: '20px', paddingTop: '16px', display: 'flex', gap: '12px' }}>
                  <button className="btn btn-secondary btn-sm" onClick={() => handleShare(ticket)}>Compartilhar ingresso</button>
                  <button className="btn btn-ghost btn-sm" onClick={() => handleDownload(ticket)}>Baixar QR</button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}

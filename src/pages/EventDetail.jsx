import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { formatFullDate, formatTime, formatCurrency, eventStatus, gradientFor } from '../services/format.js';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [ticketTypes, setTicketTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const [eventData, typesData] = await Promise.all([
          api.getEvent(id),
          api.listTicketTypes(id),
        ]);
        setEvent(eventData);
        const types = typesData.results || typesData;
        setTicketTypes(types);
        if (types.length) setSelectedType(types[0]);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  const handleCheckout = () => {
    if (!selectedType) return;
    navigate('/checkout', {
      state: {
        event,
        ticketType: selectedType,
        quantity,
      },
    });
  };

  if (loading) return <section className="section"><div className="container"><p className="text-muted">Carregando...</p></div></section>;
  if (error || !event) return <section className="section"><div className="container"><p className="text-danger">{error || 'Evento não encontrado.'}</p></div></section>;

  const { available, soldOut } = eventStatus(event);
  const city = event.venue ? `${event.venue.city}, ${event.venue.state}` : '';
  const total = selectedType ? selectedType.price * quantity : 0;

  return (
    <>
      <section className="event-hero" style={{ padding: '32px 0', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'start' }}>
          <div className="card-image" style={{ background: gradientFor(event.id), borderRadius: '16px', minHeight: '420px' }}>
            <span className="badge badge-accent" style={{ top: '16px', left: '16px' }}>{event.category?.name}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge-success">{available ? 'Ingressos disponíveis' : 'Indisponível'}</span>
              <span className="badge badge-primary">Maiores de {event.min_age || 0}</span>
            </div>
            <h1>{event.title}</h1>
            <p className="text-muted">{event.description}</p>
            <div className="flex gap-4" style={{ flexWrap: 'wrap', color: 'var(--color-text-muted)', fontSize: '14px' }}>
              <span>📅 {formatFullDate(event.starts_at)}</span>
              <span>🕗 {formatTime(event.starts_at)}</span>
              <span>📍 {city}</span>
              <span>🏟️ {event.venue?.name}</span>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '16px' }}>Selecione seus ingressos</h4>
              <div className="grid grid-2" style={{ marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Tipo de ingresso</label>
                  <select className="form-select" value={selectedType?.id || ''} onChange={(e) => setSelectedType(ticketTypes.find(t => t.id === Number(e.target.value)))}>
                    {ticketTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name} ({formatCurrency(type.price)})</option>
                    ))}
                  </select>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Quantidade</label>
                  <select className="form-select" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                    {[1, 2, 3, 4, 5, 6].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-sm text-muted" style={{ marginBottom: '16px' }}>
                {selectedType?.available > 0 ? `${selectedType.available} ingressos disponíveis` : 'Ingressos esgotados para este tipo'}
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-muted text-sm">Total</span>
                  <div className="price">{formatCurrency(total)}</div>
                </div>
                <button onClick={handleCheckout} className="btn btn-primary btn-lg" disabled={soldOut || !selectedType || selectedType.available < quantity}>
                  Continuar
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-2" style={{ gap: '48px' }}>
            <div>
              <h2 style={{ marginBottom: '16px' }}>Sobre o evento</h2>
              <p className="text-muted" style={{ marginBottom: '16px' }}>{event.description}</p>
              {event.info && typeof event.info === 'object' && Array.isArray(event.info) && (
                <>
                  <h4 style={{ margin: '24px 0 12px' }}>Informações importantes</h4>
                  <ul className="text-muted text-sm" style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {event.info.map((item, i) => <li key={i}>{item}</li>)}
                  </ul>
                </>
              )}
            </div>
            <div>
              <h2 style={{ marginBottom: '16px' }}>Mapa de setores</h2>
              <div style={{ background: 'var(--color-background)', borderRadius: '12px', padding: '24px' }}>
                <div style={{ height: '8px', background: 'var(--color-text-muted)', borderRadius: '4px', marginBottom: '24px', opacity: 0.3 }}></div>
                <div style={{ textAlign: 'center', marginBottom: '16px' }} className="text-xs text-muted">PALCO</div>
                <p className="text-sm text-muted text-center">Mapa de assentos em breve.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

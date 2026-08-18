import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { events } from '../data/events';

const SEAT_ROWS = ['A', 'B', 'C'];
const SEATS_PER_ROW = 7;

export default function EventDetail() {
  const { id } = useParams();
  const event = events.find(e => e.id === Number(id)) || events[0];
  const [sector, setSector] = useState('Pista');
  const [quantity, setQuantity] = useState(1);
  const [selectedSeats, setSelectedSeats] = useState(['A3', 'A4']);

  const toggleSeat = (row, col) => {
    const seatId = `${row}${col}`;
    if (seatId === 'B2' || seatId === 'A6' || seatId === 'C4' || seatId === 'C5') return;
    setSelectedSeats(prev =>
      prev.includes(seatId) ? prev.filter(s => s !== seatId) : [...prev, seatId]
    );
  };

  const isOccupied = (row, col) => {
    const seatId = `${row}${col}`;
    return ['B2', 'A6', 'C4', 'C5'].includes(seatId);
  };

  const isSelected = (row, col) => selectedSeats.includes(`${row}${col}`);

  const price = sector === 'Pista' ? event.price : sector === 'Camarote' ? event.price * 2.33 : event.price * 3.75;
  const total = price * quantity;

  return (
    <>
      <section className="event-hero" style={{ padding: '32px 0', background: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '32px', alignItems: 'start' }}>
          <div className="card-image" style={{ background: event.gradient, borderRadius: '16px', minHeight: '420px' }}>
            <span className="badge badge-accent" style={{ top: '16px', left: '16px' }}>{event.category}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div className="flex gap-2" style={{ flexWrap: 'wrap' }}>
              <span className="badge badge-success">Ingressos disponíveis</span>
              <span className="badge badge-primary">Maiores de 18</span>
            </div>
            <h1>{event.title}</h1>
            <p className="text-muted">{event.description}</p>
            <div className="flex gap-4" style={{ flexWrap: 'wrap', color: 'var(--color-text-muted)', fontSize: '14px' }}>
              <span>📅 {event.fullDate}</span>
              <span>🕗 {event.time}</span>
              <span>📍 {event.location}</span>
              <span>🏟️ {event.venue}</span>
            </div>

            <div className="card" style={{ padding: '24px' }}>
              <h4 style={{ marginBottom: '16px' }}>Selecione seus ingressos</h4>
              <div className="grid grid-2" style={{ marginBottom: '16px' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Setor</label>
                  <select className="form-select" value={sector} onChange={(e) => setSector(e.target.value)}>
                    <option value="Pista">Pista (R$ {event.price})</option>
                    <option value="Camarote">Camarote (R$ {Math.round(event.price * 2.33)})</option>
                    <option value="VIP">VIP (R$ {Math.round(event.price * 3.75)})</option>
                  </select>
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Quantidade</label>
                  <select className="form-select" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                    {[1, 2, 3, 4].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </div>
              </div>
              <p className="text-sm text-muted" style={{ marginBottom: '16px' }}>
                Para eventos com mapa de assentos, você pode escolher lugares específicos na próxima etapa.
              </p>
              <div className="flex justify-between items-center">
                <div>
                  <span className="text-muted text-sm">Total</span>
                  <div className="price">R$ {total}</div>
                </div>
                <Link to="/checkout" className="btn btn-primary btn-lg">Continuar</Link>
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
              {event.info && (
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
                {SEAT_ROWS.map(row => (
                  <div key={row} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '12px' }}>
                    <span style={{ width: '24px', textAlign: 'center', fontSize: '12px', color: 'var(--color-text-muted)' }}>{row}</span>
                    {Array.from({ length: SEATS_PER_ROW }, (_, i) => i + 1).map(col => {
                      const occupied = isOccupied(row, col);
                      const selected = isSelected(row, col);
                      return (
                        <button
                          key={col}
                          type="button"
                          disabled={occupied}
                          onClick={() => toggleSeat(row, col)}
                          style={{
                            width: '28px', height: '28px', borderRadius: '6px', border: '1px solid var(--color-border)',
                            background: occupied ? 'var(--color-border)' : selected ? 'var(--color-primary)' : 'var(--color-surface)',
                            cursor: occupied ? 'not-allowed' : 'pointer', opacity: occupied ? 0.6 : 1
                          }}
                        />
                      );
                    })}
                  </div>
                ))}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '24px', marginTop: '24px' }} className="text-xs">
                  <span className="flex items-center gap-2">
                    <span style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--color-border)', display: 'inline-block', background: 'var(--color-surface)' }}></span> Disponível
                  </span>
                  <span className="flex items-center gap-2">
                    <span style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--color-border)', display: 'inline-block', background: 'var(--color-primary)' }}></span> Selecionado
                  </span>
                  <span className="flex items-center gap-2">
                    <span style={{ width: '16px', height: '16px', borderRadius: '4px', border: '1px solid var(--color-border)', display: 'inline-block', background: 'var(--color-border)' }}></span> Ocupado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

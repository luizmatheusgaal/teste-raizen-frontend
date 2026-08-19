import { formatDate, formatTime, formatCurrency, eventStatus, gradientFor } from '../services/format.js';

export default function EventCard({ event }) {
  const { available, soldOut } = eventStatus(event);
  const city = event.venue ? `${event.venue.city}, ${event.venue.state}` : event.location;
  const category = event.category?.name || event.category || 'Evento';
  const price = event.price || event.min_price || 0;

  return (
    <article className="card">
      <div className="card-image" style={{ background: event.gradient || gradientFor(event.id) }}>
        <span className={`badge ${category === 'Show' ? 'badge-accent' : 'badge-primary'}`}>
          {category}
        </span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <div className="card-meta">
          <span>{formatDate(event.starts_at)} • {formatTime(event.starts_at)}</span>
          <span>{city}</span>
        </div>
        <div className="card-footer">
          <span className="card-price">{price ? formatCurrency(price) : 'A partir de R$ 0,00'}</span>
          {soldOut ? (
            <span className="badge badge-danger">Esgotado</span>
          ) : available ? (
            <span className="badge badge-success">Disponível</span>
          ) : (
            <span className="badge badge-danger">Indisponível</span>
          )}
        </div>
      </div>
    </article>
  );
}

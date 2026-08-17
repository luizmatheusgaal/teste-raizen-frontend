import { Link } from 'react-router-dom';

export default function EventCard({ event }) {
  return (
    <article className="card">
      <div className="card-image" style={{ background: event.gradient }}>
        <span className={`badge ${event.category === 'Show' ? 'badge-accent' : 'badge-primary'}`}>
          {event.category}
        </span>
      </div>
      <div className="card-body">
        <h3 className="card-title">{event.title}</h3>
        <div className="card-meta">
          <span>{event.date} • {event.time}</span>
          <span>{event.location}</span>
        </div>
        <div className="card-footer">
          <span className="card-price">R$ {event.price}</span>
          {event.soldOut ? (
            <span className="badge badge-danger">Esgotado</span>
          ) : (
            <span className="badge badge-success">Disponível</span>
          )}
        </div>
      </div>
    </article>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { events } from '../data/events';

const catalog = events.map(e => ({ id: e.id, title: e.title, category: e.category, gradient: e.gradient }));
const venues = ['Arena Verzel', 'Cine Verzel', 'Teatro Positivo', 'Estádio Municipal'];

export default function CreateEvent() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState(1);
  const [form, setForm] = useState({
    datetime: '', venue: 'Arena Verzel', capacity: 5000, price: 120, saleType: 'map', status: 'draft', description: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Evento publicado com sucesso!');
    navigate('/organizador');
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h1 style={{ marginBottom: '8px' }}>Criar novo evento</h1>
        <p className="text-muted" style={{ marginBottom: '32px' }}>Escolha um show ou filme do catálogo e defina data, local e preço</p>

        <div className="card" style={{ padding: '32px', marginBottom: '24px' }}>
          <h4 style={{ marginBottom: '16px' }}>1. Buscar no catálogo externo</h4>
          <div className="flex gap-2" style={{ marginBottom: '16px' }}>
            <select className="form-select" style={{ width: '160px', flex: 'none' }}>
              <option>Ticketmaster</option>
              <option>Sympla</option>
              <option>Ingresso.com</option>
            </select>
            <input className="form-input" type="text" placeholder="Buscar show ou filme..." />
            <button className="btn btn-primary">Buscar</button>
          </div>
          <div className="grid grid-3">
            {catalog.map(item => (
              <div
                key={item.id}
                onClick={() => setSelected(item.id)}
                className="card"
                style={{
                  cursor: 'pointer',
                  border: selected === item.id ? '2px solid var(--color-primary)' : '1px solid var(--color-border)'
                }}
              >
                <div className="card-image" style={{ background: item.gradient, minHeight: '140px' }}></div>
                <div className="card-body">
                  <h4 className="card-title" style={{ fontSize: '16px' }}>{item.title}</h4>
                  <p className="text-xs text-muted">{item.category}</p>
                  {selected === item.id && <span className="badge badge-primary">Selecionado</span>}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: '32px' }}>
          <h4 style={{ marginBottom: '24px' }}>2. Configurar evento</h4>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Data e hora</label>
                <input className="form-input" type="datetime-local" value={form.datetime} onChange={(e) => setForm({ ...form, datetime: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Local / Venue</label>
                <select className="form-select" value={form.venue} onChange={(e) => setForm({ ...form, venue: e.target.value })}>
                  {venues.map(v => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Capacidade total</label>
                <input className="form-input" type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Preço base (R$)</label>
                <input className="form-input" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Tipo de venda</label>
                <select className="form-select" value={form.saleType} onChange={(e) => setForm({ ...form, saleType: e.target.value })}>
                  <option value="map">Mapa de assentos</option>
                  <option value="free">Livre</option>
                  <option value="numbered">Lugares numerados</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Status inicial</label>
                <select className="form-select" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                  <option value="draft">Rascunho</option>
                  <option value="published">Publicado</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Descrição</label>
              <textarea className="form-textarea" rows="4" placeholder="Descreva o evento..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}></textarea>
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" className="btn btn-secondary">Salvar rascunho</button>
              <button type="submit" className="btn btn-primary">Publicar evento</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

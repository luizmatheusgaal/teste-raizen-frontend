import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';

export default function CreateEvent() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: '',
    description: '',
    category_id: '',
    venue_id: '',
    starts_at: '',
    ends_at: '',
    min_age: 0,
    price: 0,
    capacity: 1000,
    status: 'published',
  });

  useEffect(() => {
    async function load() {
      try {
        const [catData, venueData] = await Promise.all([api.listCategories(), api.listVenues()]);
        const cats = catData.results || catData;
        const vs = venueData.results || venueData;
        setCategories(cats);
        setVenues(vs);
        if (cats.length) setForm(f => ({ ...f, category_id: cats[0].id }));
        if (vs.length) setForm(f => ({ ...f, venue_id: vs[0].id }));
      } catch {
        // errors are shown by the global toast
      }
    }
    load();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const event = await api.createEvent({
        title: form.title,
        description: form.description,
        category_id: Number(form.category_id),
        venue_id: Number(form.venue_id),
        starts_at: new Date(form.starts_at).toISOString(),
        ends_at: form.ends_at ? new Date(form.ends_at).toISOString() : null,
        min_age: Number(form.min_age),
        status: form.status,
      });

      await api.createTicketType({
        event: event.id,
        name: 'Pista',
        price: Number(form.price),
        capacity: Number(form.capacity),
        description: 'Ingresso geral',
      });

      navigate('/organizador');
    } catch {
      // errors are shown by the global toast
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '960px' }}>
        <h1 style={{ marginBottom: '8px' }}>Criar novo evento</h1>
        <p className="text-muted" style={{ marginBottom: '32px' }}>Preencha as informações do evento e defina o ingresso principal</p>

        <div className="card" style={{ padding: '32px' }}>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-2" style={{ gap: '16px' }}>
              <div className="form-group">
                <label className="form-label">Título</label>
                <input className="form-input" type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Categoria</label>
                <select className="form-select" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })} required>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Local / Venue</label>
                <select className="form-select" value={form.venue_id} onChange={(e) => setForm({ ...form, venue_id: e.target.value })} required>
                  {venues.map(v => <option key={v.id} value={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Data e hora de início</label>
                <input className="form-input" type="datetime-local" value={form.starts_at} onChange={(e) => setForm({ ...form, starts_at: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Término (opcional)</label>
                <input className="form-input" type="datetime-local" value={form.ends_at} onChange={(e) => setForm({ ...form, ends_at: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Idade mínima</label>
                <input className="form-input" type="number" value={form.min_age} onChange={(e) => setForm({ ...form, min_age: e.target.value })} />
              </div>
              <div className="form-group">
                <label className="form-label">Preço do ingresso Pista (R$)</label>
                <input className="form-input" type="number" step="0.01" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} required />
              </div>
              <div className="form-group">
                <label className="form-label">Capacidade</label>
                <input className="form-input" type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} required />
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
              <textarea className="form-textarea" rows="4" placeholder="Descreva o evento..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} required></textarea>
            </div>
            <div className="flex justify-between mt-6">
              <button type="button" className="btn btn-secondary" onClick={() => navigate('/organizador')}>Cancelar</button>
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Salvando...' : 'Publicar evento'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

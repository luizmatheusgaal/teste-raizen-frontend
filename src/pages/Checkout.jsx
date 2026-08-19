import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { api } from '../services/api.js';
import { formatFullDate, formatTime, formatCurrency } from '../services/format.js';

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { event, ticketType, quantity } = location.state || {};

  const [paymentResult, setPaymentResult] = useState('approve');
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!event || !ticketType) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <p className="text-muted">Nenhum ingresso selecion. Volte para a página do evento.</p>
          <button onClick={() => navigate('/')} className="btn btn-primary mt-4">Ver eventos</button>
        </div>
      </section>
    );
  }

  const fee = 12;
  const subtotal = ticketType.price * quantity;
  const total = subtotal + fee;

  const handlePayment = async (e) => {
    e.preventDefault();

    if (paymentResult !== 'approve') {
      alert('Pagamento recusado. Tente outro cartão.');
      return;
    }

    setLoading(true);
    try {
      const order = await api.createOrder({
        items: [{ ticket_type: ticketType.id, quantity, unit_price: ticketType.price }],
      });
      await api.payOrder(order.id);
      setPaid(true);
      setTimeout(() => navigate('/meus-ingressos'), 2000);
    } catch {
      // errors are shown by the global toast
    } finally {
      setLoading(false);
    }
  };

  if (paid) {
    return (
      <section className="section">
        <div className="container" style={{ maxWidth: '640px', textAlign: 'center' }}>
          <div className="card" style={{ padding: '48px' }}>
            <h2 style={{ color: 'var(--color-success)', marginBottom: '16px' }}>Pagamento confirmado!</h2>
            <p className="text-muted">Seu ingresso foi gerado e está sendo redirecionado para &quot;Meus ingressos&quot;.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container">
        <h1 style={{ marginBottom: '8px' }}>Finalizar compra</h1>
        <p className="text-muted" style={{ marginBottom: '32px' }}>Revisão do pedido e pagamento simulado</p>

        <div className="grid grid-2" style={{ gap: '32px', alignItems: 'start' }}>
          <div className="card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '24px' }}>Resumo do pedido</h3>
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
              <div style={{ width: '120px', height: '80px', borderRadius: '8px', background: 'var(--color-primary)' }}></div>
              <div>
                <h4 style={{ marginBottom: '4px' }}>{event.title}</h4>
                <p className="text-muted text-sm">{formatFullDate(event.starts_at)} • {formatTime(event.starts_at)} • {event.venue?.city}</p>
                <p className="text-sm">{ticketType.name} • {quantity} ingresso(s)</p>
              </div>
            </div>

            <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="flex justify-between text-sm"><span className="text-muted">{quantity}x {ticketType.name}</span><span>{formatCurrency(subtotal)}</span></div>
              <div className="flex justify-between text-sm"><span className="text-muted">Taxa de serviço</span><span>{formatCurrency(fee)}</span></div>
              <div className="flex justify-between" style={{ fontSize: '18px', fontWeight: 700, marginTop: '8px' }}>
                <span>Total</span>
                <span style={{ color: 'var(--color-secondary)' }}>{formatCurrency(total)}</span>
              </div>
            </div>
          </div>

          <div className="card" style={{ padding: '32px' }}>
            <h3 style={{ marginBottom: '24px' }}>Dados do pagamento</h3>
            <form onSubmit={handlePayment}>
              <div className="form-group">
                <label className="form-label">Nome no cartão</label>
                <input className="form-input" type="text" defaultValue="João Silva" required />
              </div>
              <div className="form-group">
                <label className="form-label">Número do cartão</label>
                <input className="form-input" type="text" defaultValue="4111 1111 1111 1111" required />
              </div>
              <div className="grid grid-2" style={{ gap: '16px' }}>
                <div className="form-group">
                  <label className="form-label">Validade</label>
                  <input className="form-input" type="text" defaultValue="12/28" required />
                </div>
                <div className="form-group">
                  <label className="form-label">CVV</label>
                  <input className="form-input" type="text" defaultValue="123" required />
                </div>
              </div>

              <div style={{ background: 'var(--color-background)', borderRadius: '8px', padding: '16px', margin: '24px 0' }}>
                <p className="text-sm text-muted" style={{ marginBottom: '8px' }}>Ambiente de testes — escolha o resultado simulado:</p>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="payment" checked={paymentResult === 'approve'} onChange={() => setPaymentResult('approve')} /> Aprovar pagamento
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <input type="radio" name="payment" checked={paymentResult === 'refuse'} onChange={() => setPaymentResult('refuse')} /> Recusar pagamento
                  </label>
                </div>
              </div>

              <button type="submit" className="btn btn-primary btn-lg w-full" style={{ marginBottom: '12px' }} disabled={loading}>
                {loading ? 'Processando...' : `Pagar ${formatCurrency(total)}`}
              </button>
              <p className="text-xs text-muted text-center">Pagamento processado de forma simulada. Nenhuma cobrança real será efetuada.</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

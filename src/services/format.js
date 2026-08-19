const gradients = [
  'linear-gradient(135deg, #16A34A 0%, #15803D 100%)',
  'linear-gradient(135deg, #22C55E 0%, #16A34A 100%)',
  'linear-gradient(135deg, #4ADE80 0%, #22C55E 100%)',
  'linear-gradient(135deg, #86EFAC 0%, #4ADE80 100%)',
  'linear-gradient(135deg, #15803D 0%, #14532D 100%)',
  'linear-gradient(135deg, #166534 0%, #15803D 100%)',
];

export function gradientFor(id) {
  return gradients[(id - 1) % gradients.length];
}

export function formatDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

export function formatFullDate(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' });
}

export function formatTime(iso) {
  if (!iso) return '';
  const date = new Date(iso);
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export function formatCurrency(value) {
  const number = Number(value) || 0;
  return number.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export function eventStatus(event) {
  if (event.status === 'sold_out' || event.status === 'cancelled') {
    return { available: false, soldOut: event.status === 'sold_out' };
  }
  return { available: true, soldOut: false };
}

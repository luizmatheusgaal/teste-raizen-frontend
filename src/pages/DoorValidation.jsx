import { useState } from 'react';
import { api } from '../services/api.js';

export default function DoorValidation() {
  const [code, setCode] = useState('');
  const [result, setResult] = useState(null);
  const [stats, setStats] = useState({ validated: 42, refused: 3 });
  const [loading, setLoading] = useState(false);

  const handleValidate = async (e) => {
    e.preventDefault();
    if (!code) {
      setResult({ type: 'invalid', message: 'Digite um código válido.' });
      return;
    }

    setLoading(true);
    try {
      const data = await api.validateTicket(code);
      setResult({
        type: 'valid',
        title: 'Ingresso válido',
        message: data.msg || `${data.ticket.event} — ${data.ticket.type}\nCliente: ${data.ticket.owner}\nCódigo: ${data.ticket.code}`
      });
      setStats(s => ({ ...s, validated: s.validated + 1 }));
    } catch (err) {
      const backendMsg = err.data?.msg || err.data?.message || err.message;
      const isUsed = backendMsg?.includes('utilizado');
      setResult({
        type: isUsed ? 'used' : 'invalid',
        title: isUsed ? 'Ingresso já utilizado' : 'Ingresso inválido',
        message: backendMsg || 'Código não encontrado para este evento.'
      });
      if (!isUsed) setStats(s => ({ ...s, refused: s.refused + 1 }));
    } finally {
      setLoading(false);
    }
  };

  const resultClass = {
    valid: { background: 'rgba(34, 197, 94, 0.1)', color: 'var(--color-success)' },
    used: { background: 'rgba(245, 158, 11, 0.1)', color: 'var(--color-warning)' },
    invalid: { background: 'rgba(244, 63, 94, 0.1)', color: 'var(--color-danger)' }
  };

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: '640px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h1>Validar ingresso</h1>
          <p className="text-muted">Escaneie o QR ou digite o código manualmente</p>
        </div>

        <div className="card" style={{ padding: '32px', textAlign: 'center' }}>
          <div style={{
            width: '320px', height: '240px', border: '2px dashed var(--color-primary)',
            borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: 'rgba(22, 163, 74, 0.04)', margin: '0 auto 24px'
          }}>
            <div>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#16A34A" strokeWidth="2">
                <rect x="3" y="3" width="18" height="18" rx="2" />
                <path d="M3 9h18M9 21V9" />
              </svg>
              <p className="text-sm text-muted" style={{ marginTop: '12px' }}>Aponte a câmera para o QR</p>
            </div>
          </div>

          <p className="text-xs text-muted" style={{ marginBottom: '16px' }}>— ou —</p>

          <form onSubmit={handleValidate}>
            <div className="form-group" style={{ maxWidth: '320px', margin: '0 auto 16px' }}>
              <label className="form-label">Digite o código do ingresso</label>
              <input
                className="form-input"
                type="text"
                placeholder="1-1-001"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                style={{ textAlign: 'center', letterSpacing: '2px' }}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg" style={{ minWidth: '200px' }} disabled={loading}>
              {loading ? 'Validando...' : 'Validar'}
            </button>
          </form>
        </div>

        {result && (
          <div className="card" style={{ padding: '24px', textAlign: 'center', marginTop: '24px', ...resultClass[result.type] }}>
            <h3 style={{ marginBottom: '8px' }}>{result.title}</h3>
            <p className="text-sm" style={{ whiteSpace: 'pre-line' }}>{result.message}</p>
            {result.type === 'valid' && (
              <button className="btn btn-secondary btn-sm mt-4">Liberar entrada</button>
            )}
          </div>
        )}

        <div className="grid grid-2" style={{ gap: '16px', marginTop: '24px' }}>
          <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>{stats.validated}</div>
            <div className="text-muted text-sm">Validados hoje</div>
          </div>
          <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--font-display)', fontSize: '24px', fontWeight: 800, color: 'var(--color-primary)' }}>{stats.refused}</div>
            <div className="text-muted text-sm">Recusados</div>
          </div>
        </div>
      </div>
    </section>
  );
}

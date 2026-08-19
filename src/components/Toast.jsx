const typeStyles = {
  error: { background: 'var(--color-danger)', color: '#fff' },
  success: { background: 'var(--color-success)', color: '#fff' },
  warning: { background: 'var(--color-warning)', color: '#000' },
  info: { background: 'var(--color-primary)', color: '#fff' },
};

export default function Toast({ message, type = 'error' }) {
  return (
    <div
      style={{
        position: 'fixed',
        top: '24px',
        right: '24px',
        zIndex: 9999,
        padding: '16px 24px',
        borderRadius: '12px',
        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        maxWidth: '360px',
        fontSize: '14px',
        fontWeight: 500,
        ...typeStyles[type],
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      {message}
      <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

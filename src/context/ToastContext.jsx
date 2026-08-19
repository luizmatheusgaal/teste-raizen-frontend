import { createContext, useEffect, useState } from 'react';
import { subscribeToast } from '../services/toast.js';
import Toast from '../components/Toast.jsx';

const ToastContext = createContext(null);

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  useEffect(() => {
    return subscribeToast(({ message, type, duration }) => {
      setToast({ message, type });
      setTimeout(() => setToast(null), duration);
    });
  }, []);

  return (
    <ToastContext.Provider value={{}}>
      {children}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </ToastContext.Provider>
  );
}

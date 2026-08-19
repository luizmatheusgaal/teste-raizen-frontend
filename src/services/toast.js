let subscriber = null;

export function subscribeToast(fn) {
  subscriber = fn;
  return () => {
    subscriber = null;
  };
}

export function notifyToast(message, type = 'error', duration = 4000) {
  if (subscriber) {
    subscriber({ message, type, duration });
  }
}

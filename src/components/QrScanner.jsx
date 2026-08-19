import { useEffect, useRef } from 'react';

export default function QrScanner({ onScan, onError }) {
  const scannerRef = useRef(null);
  const scannedRef = useRef(false);

  useEffect(() => {
    let scanner;
    let destroyed = false;

    import('html5-qrcode').then(({ Html5QrcodeScanner }) => {
      if (destroyed) return;

      scanner = new Html5QrcodeScanner(
        'qr-reader',
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );

      scanner.render(
        (decodedText) => {
          if (scannedRef.current) return;
          scannedRef.current = true;
          onScan(decodedText);
          if (scanner) {
            scanner.clear().catch(() => {});
          }
        },
        (errorMessage) => {
          if (onError) onError(errorMessage);
        }
      );

      scannerRef.current = scanner;
    });

    return () => {
      destroyed = true;
      if (scanner) {
        scanner.clear().catch(() => {});
      }
    };
  }, [onScan, onError]);

  return (
    <div
      id="qr-reader"
      style={{
        width: '100%',
        maxWidth: '400px',
        margin: '0 auto 24px',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    />
  );
}

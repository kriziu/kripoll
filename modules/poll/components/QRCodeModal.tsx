import { useEffect, useState } from 'react';

import QRCode from 'qrcode';
import { AiOutlineClose } from 'react-icons/ai';

import { useModal } from '@/common/hooks/useModal';

const QRCodeModal = () => {
  const { closeModal } = useModal();

  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    QRCode.toDataURL(
      window.location.toString(),
      { width: 256, margin: 2 },
      (_, url) => setQrUrl(url)
    );
  }, []);

  return (
    <>
      <h3>QR Code</h3>
      <button
        className="absolute top-2 right-2 rounded-lg p-2 hover:scale-105 active:scale-100"
        onClick={() => closeModal()}
      >
        <AiOutlineClose />
      </button>
      <img alt="qr code" srcSet={qrUrl} className="mt-2 w-full rounded-lg" />
    </>
  );
};

export default QRCodeModal;

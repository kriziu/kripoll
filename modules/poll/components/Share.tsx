import {
  FaFacebookF,
  FaRedditAlien,
  FaShare,
  FaSpinner,
  FaTelegramPlane,
  FaTwitter,
  FaWhatsapp,
} from 'react-icons/fa';
import { IoMdClipboard } from 'react-icons/io';
import { MdOutlineQrCode2 } from 'react-icons/md';
import {
  FacebookShareButton,
  RedditShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  TelegramShareButton,
} from 'react-share';

import { useModal } from '@/common/hooks/useModal';

import QRCodeModal from './QRCodeModal';

const Share = () => {
  const { openModal } = useModal();

  return (
    <div className="mt-10">
      <h2 className="flex items-center gap-2 text-lg font-semibold leading-none">
        <FaShare />
        Share with others
      </h2>

      <div className="mt-2">
        <p className="ml-1 text-zinc-400">Invite via link</p>
        <div className="relative">
          <input
            type="text"
            className="input text-zinc-500"
            value={window.location.toString()}
            readOnly
          />
          <button className="btn absolute top-0 right-0 flex h-full w-min items-center justify-center gap-1 py-0 text-sm leading-none">
            <IoMdClipboard /> Copy
          </button>
        </div>
      </div>

      <div className="flex h-48 pt-2">
        <div className="flex-1 pr-6">
          <p className="ml-1 text-zinc-400">Social media</p>
          <div className="flex flex-col gap-2">
            <FacebookShareButton
              url={window.location.toString()}
              className="btn flex  items-center justify-center gap-2 rounded-lg leading-none"
              style={{
                backgroundColor: '#4267B2',
                backgroundImage: 'none',
                padding: '.3rem 1rem',
              }}
            >
              <FaFacebookF /> Share on Facebook
            </FacebookShareButton>

            <RedditShareButton
              url={window.location.toString()}
              className="btn flex  items-center justify-center gap-2 rounded-lg leading-none"
              style={{
                backgroundColor: '#FF4500',
                backgroundImage: 'none',
                padding: '.3rem 1rem',
              }}
            >
              <FaRedditAlien /> Share on Reddit
            </RedditShareButton>

            <TwitterShareButton
              url={window.location.toString()}
              className="btn flex  items-center justify-center gap-2 rounded-lg leading-none"
              style={{
                backgroundColor: '#1DA1F2',
                backgroundImage: 'none',
                padding: '.3rem 1rem',
              }}
            >
              <FaTwitter /> Share on Twitter
            </TwitterShareButton>

            <WhatsappShareButton
              url={window.location.toString()}
              className="btn flex  items-center justify-center gap-2 rounded-lg leading-none"
              style={{
                backgroundColor: '#25D366',
                backgroundImage: 'none',
                padding: '.3rem 1rem',
              }}
            >
              <FaWhatsapp /> Share on WhatsApp
            </WhatsappShareButton>

            <TelegramShareButton
              url={window.location.toString()}
              className="btn flex  items-center justify-center gap-2 rounded-lg leading-none"
              style={{
                backgroundColor: '#37AEE2',
                backgroundImage: 'none',
                padding: '.3rem 1rem',
              }}
            >
              <FaTelegramPlane /> Share on Telegram
            </TelegramShareButton>
          </div>
        </div>

        <div className="mt-7 h-full w-px bg-zinc-500"></div>

        <div className="flex-1 pl-6">
          <p className="ml-1 text-zinc-400">Live audience</p>
          <div className="flex flex-col gap-2">
            <button
              className="btn flex items-center justify-center gap-2 rounded-lg from-green-500 to-yellow-500 leading-none"
              onClick={() => openModal(<QRCodeModal />)}
            >
              <MdOutlineQrCode2 /> Show QR Code
            </button>
            <button className="btn flex items-center justify-center gap-2 rounded-lg from-cyan-500 to-blue-500 leading-none">
              <FaSpinner /> Generate PIN Code
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;

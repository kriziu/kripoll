import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
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

import Loader from '@/common/components/Loader';
import { useModal } from '@/common/hooks/useModal';

import { usePoll } from '../hooks/usePoll';
import QRCodeModal from './QRCodeModal';

const Share = () => {
  const { poll, refetch } = usePoll();
  const { openModal } = useModal();

  const generateMutation = useMutation(
    () => axios.get(`/api/generate?id=${poll?.id}`),
    {
      onSuccess: () => {
        refetch();
        window.scroll({ top: 0, behavior: 'smooth' });
      },
    }
  );

  return (
    <>
      {generateMutation.isLoading && <Loader />}
      <div className="mt-10 mb-48 md:mb-24">
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

        <div className="flex h-48 flex-col pt-2 md:flex-row">
          <div className="flex-1 md:pr-6">
            <p className="ml-1 text-zinc-400">Social media</p>
            <div className="flex flex-col gap-2">
              <FacebookShareButton
                url={window.location.toString()}
                quote={poll?.title}
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
                title={poll?.title}
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
                title={poll?.title}
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
                title={poll?.title}
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
                title={poll?.title}
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

          <div className="mt-7 hidden h-full w-px bg-zinc-500 md:block"></div>

          <div className="mt-5 flex-1 md:mt-0 md:pl-6">
            <p className="ml-1 text-zinc-400">Live audience</p>
            <div className="flex flex-col gap-2">
              <button
                className="btn flex items-center justify-center gap-2 rounded-lg from-green-500 to-yellow-500 leading-none"
                onClick={() => openModal(<QRCodeModal />)}
              >
                <MdOutlineQrCode2 /> Show QR Code
              </button>
              <button
                className="btn flex items-center justify-center gap-2 rounded-lg from-cyan-500 to-blue-500 leading-none"
                onClick={() => generateMutation.mutate()}
              >
                <FaSpinner /> Generate PIN Code
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;

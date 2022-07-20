import { createContext, useEffect, useRef, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

import { bgAnimation, modalAnimation } from '../animations/modal.animations';

export const modalContext = createContext<{
  opened: boolean;
  modal: JSX.Element;
  openModal: (modal: JSX.Element, onClose?: () => void) => void;
  closeModal: (withCallback?: boolean) => void;
}>({ opened: false, modal: <></>, openModal: () => {}, closeModal: () => {} });

const Portal = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [portal, setPortal] = useState<HTMLElement>();

  useEffect(() => {
    const node = document.getElementById('portal');
    if (node) setPortal(node);
  }, []);

  if (!portal) return null;

  return createPortal(children, portal);
};

const ModalManager = ({ children }: { children: JSX.Element }) => {
  const closeCallback = useRef<() => void>(() => {});

  const [{ opened, modal }, setModal] = useState({
    opened: false,
    modal: <></>,
  });

  const [portalNode, setPortalNode] = useState<HTMLElement>();

  useEffect(() => {
    if (!portalNode) {
      const node = document.getElementById('portal');
      if (node) setPortalNode(node);
      return;
    }

    if (opened) {
      portalNode.style.pointerEvents = 'all';
    } else {
      portalNode.style.pointerEvents = 'none';
    }
  }, [opened, portalNode]);

  const openModal = (newModal: JSX.Element, onClose?: () => void) => {
    setModal({ opened: true, modal: newModal });
    if (onClose) closeCallback.current = onClose;
  };

  const closeModal = (withCallback: boolean = true) => {
    setModal({ opened: false, modal: <></> });

    if (withCallback) closeCallback.current();
    closeCallback.current = () => {};
  };

  return (
    <modalContext.Provider
      value={{
        opened,
        modal,
        openModal,
        closeModal,
      }}
    >
      <Portal>
        <motion.div
          className="fixed top-0 left-0 flex h-full w-full items-center justify-center bg-black/50"
          onClick={() => closeModal()}
          variants={bgAnimation}
          initial="closed"
          animate={opened ? 'opened' : 'closed'}
        >
          <AnimatePresence>
            {opened && (
              <motion.div
                variants={modalAnimation}
                initial="closed"
                animate="opened"
                exit="exited"
                onClick={(e) => e.stopPropagation()}
                className="relative mx-4 w-full max-w-sm rounded-xl bg-zinc-800 p-5"
              >
                {modal}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </Portal>
      {children}
    </modalContext.Provider>
  );
};

export default ModalManager;

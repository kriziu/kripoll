import { useEffect, useState } from 'react';

import { AnimatePresence, motion } from 'framer-motion';
import { createPortal } from 'react-dom';

import { bgAnimation, modalAnimation } from '../animations/modal.animations';

const Portal = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  const [portal, setPortal] = useState<HTMLElement>();

  useEffect(() => {
    const node = document.getElementById('portal');
    if (node) setPortal(node);
  }, []);

  if (!portal) return null;

  return createPortal(children, portal);
};

const ModalManager = () => {
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

  return (
    <Portal>
      <motion.div
        className="absolute z-40 flex min-h-full w-full items-center justify-center bg-black/80"
        onClick={() => setModal({ modal: <></>, opened: false })}
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
              className="p-6"
            >
              {modal}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </Portal>
  );
};

export default ModalManager;

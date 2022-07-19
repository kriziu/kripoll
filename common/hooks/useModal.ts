import { useContext } from 'react';

import { modalContext } from '../context/modalContext';

export const useModal = () => {
  const { openModal, closeModal } = useContext(modalContext);

  return { openModal, closeModal };
};

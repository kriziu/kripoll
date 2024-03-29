import { ReactChild } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Circle from '../components/Circle';
import ModalManager from '../context/modalContext';

const MainLayout = ({ children }: { children: ReactChild }) => {
  return (
    <ModalManager>
      <>
        <ToastContainer position="top-center" theme="dark" />
        <div className="relative z-0 h-full w-full">
          {children}
          <div className="fixed top-0 -z-50 h-[110%] w-full overflow-hidden bg-black">
            <div className="absolute h-full w-full bg-black/40 backdrop-blur-2xl"></div>
            <Circle color="purple" x={15} y={42} radius={16} />
            <Circle color="blue" x={45} y={43} radius={10} />
            <Circle color="blue" x={65} y={15} radius={16} />
            <Circle color="purple" x={70} y={67} radius={10} />
          </div>
        </div>
      </>
    </ModalManager>
  );
};

export default MainLayout;

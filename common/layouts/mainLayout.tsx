import { ReactChild } from 'react';

import Circle from '../components/Circle';

const MainLayout = ({ children }: { children: ReactChild }) => {
  return (
    <div className="relative z-0 h-full w-full">
      {children}
      <div className="fixed top-0 -z-50 h-full w-full overflow-hidden bg-black">
        <div className="absolute h-full w-full bg-black/40 backdrop-blur-2xl"></div>
        <Circle color="purple" x={15} y={45} radius={16} />
        <Circle color="blue" x={45} y={50} radius={10} />
        <Circle color="blue" x={65} y={15} radius={16} />
        <Circle color="purple" x={70} y={75} radius={10} />
      </div>
    </div>
  );
};

export default MainLayout;

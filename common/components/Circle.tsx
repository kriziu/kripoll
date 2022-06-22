interface Props {
  x: number;
  y: number;
  radius: number;
  color: 'blue' | 'purple';
}

const Circle = ({ x, y, radius, color }: Props) => {
  return (
    <div
      className={`absolute -z-50 rounded-full ${
        color === 'blue' ? 'bg-indigo-700' : 'bg-purple-600'
      } ${radius < 16 && 'hidden sm:block'}`}
      style={{
        width: `${radius}rem`,
        height: `${radius}rem`,
        top: `${y}%`,
        left: `${x}%`,
      }}
    ></div>
  );
};

export default Circle;

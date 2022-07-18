import { motion } from 'framer-motion';

const AnswerScore = ({
  title,
  score,
  votes,
  color,
}: {
  title: string;
  color: string;
  score: number;
  votes: number;
}) => {
  return (
    <div>
      <div className="flex items-center justify-between px-1">
        <p>{title}</p>
        <p className="text-xs text-zinc-400">{`${score.toFixed(
          2
        )}% (${votes} votes)`}</p>
      </div>
      <div className="h-5 w-full rounded-lg bg-zinc-400/20">
        <motion.div
          className="h-5 rounded-lg"
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          style={{ backgroundColor: color }}
          transition={{ duration: 1, ease: [0.1, 0.1, 0.2, 1] }}
          layout
        ></motion.div>
      </div>
    </div>
  );
};

export default AnswerScore;

'use client';

import { motion } from 'framer-motion';

interface WordRevealProps {
  text: string;
}

export default function WordReveal({ text }: WordRevealProps) {
  const childContainer = {
    hidden: {
      opacity: 0,
      y: 30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <div className="h-fit overflow-hidden">
      <motion.div className="flex flex-wrap gap-2" variants={childContainer}>
        {text.split(' ').map((word, index) => (
          <motion.span key={index} variants={childContainer} className="mr-2 text-[#c2c2c2]">
            {word}
          </motion.span>
        ))}
      </motion.div>
    </div>
  );
}

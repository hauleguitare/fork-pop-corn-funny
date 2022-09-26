import * as React from 'react';
import { motion } from 'framer-motion';

interface IMotionChangePageProps extends React.HTMLAttributes<HTMLDivElement> {}

const MotionChangePage: React.FunctionComponent<IMotionChangePageProps> = (props) => {
  const { children, className, ...other } = props;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
      }}
      exit={{ opacity: 0 }}
      transition={{
        duration: 0.36,
      }}
    >
      {children}
    </motion.div>
  );
};

export default MotionChangePage;

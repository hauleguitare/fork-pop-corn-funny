import Skeleton from '@src/components/Skeleton';
import * as React from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';

interface IContentLoadingProps {
  isLoading: boolean;
  total?: number;
}

const ContentLoading: React.FunctionComponent<IContentLoadingProps> = (props) => {
  const { isLoading, total } = props;
  const arr = Array.from(Array(total).keys());

  return (
    <AnimatePresence>
      {isLoading && (
        <MotionConfig transition={{ duration: 1, delay: 2 }}>
          <Skeleton className="flex flex-start cursor-progress overflow-hidden relative flex-nowrap my-16 bg-dark-smooth-surface/30 container shadow-md rounded-lg">
            {arr.map((item) => (
              <motion.div
                key={item}
                className="min-w-[176px] min-h-[263px] mr-[30px] bg-dark-smooth-on-surface rounded-lg  shadow-md"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                transition={{
                  duration: (item + 1) * 0.36,
                }}
                exit={{
                  opacity: 0,
                }}
              />
            ))}
          </Skeleton>
        </MotionConfig>
      )}
    </AnimatePresence>
  );
};

ContentLoading.defaultProps = {
  total: 6,
};

export default ContentLoading;

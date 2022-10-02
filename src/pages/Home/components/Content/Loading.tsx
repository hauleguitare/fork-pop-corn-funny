import Skeleton from '@src/components/Skeleton';
import { motion, MotionConfig } from 'framer-motion';
import * as React from 'react';

interface IContentLoadingProps {
  isLoading: boolean;
  total?: number;
}

const ContentLoading: React.FunctionComponent<IContentLoadingProps> = (props) => {
  const { isLoading, total } = props;
  const arr = Array.from(Array(total).keys());

  return (
    <MotionConfig transition={{ duration: 0.31, delay: 0.1, type: 'spring' }}>
      {isLoading && (
        <Skeleton className="flex flex-start cursor-progress overflow-hidden relative flex-nowrap bg-dark-smooth-surface/30 container shadow-md rounded-lg">
          {arr.map((item) => (
            <motion.div
              key={item}
              className="min-w-[176px] min-h-[263px] mr-[30px] bg-dark-smooth-on-surface rounded-lg  shadow-md mb-14"
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              transition={{
                duration: (item + 1) * 0.11,
              }}
              exit={{
                opacity: 0,
              }}
            />
          ))}
        </Skeleton>
      )}
    </MotionConfig>
  );
};

ContentLoading.defaultProps = {
  total: 6,
};

export default ContentLoading;

import Tippy from '@tippyjs/react/headless';
import { useSpring } from 'framer-motion';
import * as React from 'react';
import { RiMoreFill } from 'react-icons/ri';
import { Instance, Props } from 'tippy.js';
import { motion } from 'framer-motion';

interface ISettingWrapperProps {
  onEdit: () => void;
  onDelete: () => void;
}

const SettingWrapper: React.FunctionComponent<ISettingWrapperProps> = (props) => {
  const { onEdit, onDelete } = props;
  const instanceRef = React.useRef<Instance<Props>>();
  const [isVisible, setVisible] = React.useState(false);

  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);
  const handleOnMount = () => {
    opacity.set(1);
  };
  //? Handle Event
  const handleOnUnMount = (instance: Instance<Props>) => {
    const cleanup = opacity.onChange((value) => {
      if (value <= initialScale) {
        cleanup();
        instance.unmount();
      }
    });
    opacity.set(0);
  };
  return (
    <div>
      <Tippy
        onMount={handleOnMount}
        onHide={handleOnUnMount}
        animation={true}
        offset={[0, 0]}
        interactive
        visible={isVisible}
        placement={'bottom-end'}
        onClickOutside={() => setVisible(false)}
        onCreate={(instance) => (instanceRef.current = instance)}
        render={(attrs) => (
          <motion.div
            {...attrs}
            style={{ opacity }}
            tabIndex={-1}
            className="bg-dark-smooth-theme py-2 px-4 flex flex-col shadow-md text-white/60 rounded-lg text-start"
          >
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
          </motion.div>
        )}
      >
        <button onClick={() => setVisible(!isVisible)} className="absolute top-0 right-0 w-6 h-6 mx-2 my-2">
          <RiMoreFill className="w-full h-full" fill="gray" />
        </button>
      </Tippy>
    </div>
  );
};

export default SettingWrapper;

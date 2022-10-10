import { IReaction } from '@src/@types/__Firebase__';
import Tippy from '@tippyjs/react/headless';
import { useSpring } from 'framer-motion';
import * as React from 'react';
import { Instance, Props } from 'tippy.js';
import ActiveReactions from './ActiveReactions';
import Reaction from './Reaction';

interface IReactionBarWrapperProps {
  onReaction: (type: string) => void;
  hasReaction?: IReaction;
}

const ReactionBarWrapper: React.FunctionComponent<IReactionBarWrapperProps> = (props) => {
  const { onReaction, hasReaction } = props;
  const instanceRef = React.useRef<Instance<Props>>();

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

  const handleOnReaction = async (type: string) => {
    if (instanceRef.current) {
      onReaction(type);
      setTimeout(() => {
        instanceRef.current?.hide();
      }, 230);
    }
  };

  return (
    <div className="flex items-center">
      <Tippy
        onMount={handleOnMount}
        onHide={handleOnUnMount}
        animation={true}
        offset={[30, 5]}
        interactive
        delay={[230, 0]}
        placement={'bottom'}
        onCreate={(instance) => (instanceRef.current = instance)}
        render={(attrs) => <Reaction style={{ opacity }} attrs={attrs} onReaction={handleOnReaction} />}
      >
        <button onClick={() => console.log('Reaction: from Parent Like')}>
          <ActiveReactions type={hasReaction && hasReaction.type} />
        </button>
      </Tippy>
    </div>
  );
};

export default ReactionBarWrapper;

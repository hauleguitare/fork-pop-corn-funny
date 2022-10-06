import { useSpring } from 'framer-motion';
import * as React from 'react';
import { Instance, Props } from 'tippy.js';
import Tippy from '@tippyjs/react/headless';
import Reaction from './Reaction';
import InputComment from './InputComment';

interface IChildCommentProps {}

const ChildComment: React.FunctionComponent<IChildCommentProps> = (props) => {
  const springConfig = { damping: 15, stiffness: 300 };
  const initialScale = 0.5;
  const opacity = useSpring(0, springConfig);

  // Handle Event
  const handleOnMount = () => {
    opacity.set(1);
  };

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
    <li>
      <div className="pl-8 pb-8 relative">
        <div className="flex">
          <img
            src="https://giaitri.vn/wp-content/uploads/2019/07/avatar-la-gi-01.jpg"
            alt=""
            className=" object-cover w-12 h-12 rounded-full"
          />
          <div className="mx-4 w-full ">
            <div className="py-2 px-4 bg-dark-smooth-on-surface text-sm rounded-lg">
              <span className="text-white/80">Username</span>
              <div className="py-2">
                <p className="text-white/60">
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptas culpa laboriosam ut sequi beatae a
                  ipsa, quod id possimus harum accusantium aspernatur atque, error voluptate praesentium voluptatum eos,
                  nihil quas!
                </p>
              </div>
            </div>
            <div className="text-white/80 inline-flex gap-4 pt-2 px-4">
              <div>
                <Tippy
                  onMount={handleOnMount}
                  onHide={handleOnUnMount}
                  animation={true}
                  offset={[30, 5]}
                  interactive
                  delay={[230, 0]}
                  placement={'bottom'}
                  render={(attrs) => <Reaction style={{ opacity }} attrs={attrs} />}
                >
                  <button onClick={() => console.log('Reaction: from Parent Like')}>Like</button>
                </Tippy>
              </div>
              <span className="text-sm text-white/60 inline-flex items-center">Just now</span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChildComment;

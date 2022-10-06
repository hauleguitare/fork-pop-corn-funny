import * as React from 'react';
import Tippy from '@tippyjs/react/headless';
import Reaction from './Reaction';
import { useSpring } from 'framer-motion';
import { Instance, Props } from 'tippy.js';
import InputComment from './InputComment';
import { IUserData, IComment } from '@src/@types/__Firebase__';
import { Timestamp } from 'firebase/firestore';

interface IParentCommentProps {
  children?: React.ReactNode;
  sender: Omit<IUserData, 'recently' | 'watchlist'>;
  content: string;
  createAt: Timestamp;
  down_vote_count: number;
  up_vote_count: number;
  love_vote_count: number;
  sad_vote_count: number;
  comments?: IComment | null;
}

const ParentComment: React.FunctionComponent<IParentCommentProps> = (props) => {
  const {
    children,
    sender,
    content,
    createAt,
    down_vote_count,
    up_vote_count,
    love_vote_count,
    sad_vote_count,
    comments,
  } = props;
  const [isEnableReply, setEnableReply] = React.useState(false);
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

  const handleOnEnableReply = (e: React.MouseEvent) => {
    setEnableReply(!isEnableReply);
  };

  return (
    <li>
      <div className="relative pb-8">
        <div className="flex">
          <img
            src={
              sender.images.photoURL
                ? sender.images.photoURL
                : 'https://giaitri.vn/wp-content/uploads/2019/07/avatar-la-gi-01.jpg'
            }
            alt=""
            className=" object-cover w-14 h-14 rounded-full"
          />
          <div className="mx-4 w-full">
            <div className="py-2 px-4  bg-dark-smooth-on-surface rounded-lg text-base">
              <span className="text-white/80">{sender.information.displayName}</span>
              <div className="py-2">
                <p className="text-white/60">{content}</p>
              </div>
            </div>
            <div className="text-white/80 inline-flex items-center gap-4 pt-2 px-4">
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

              <button onClick={handleOnEnableReply} className={`${isEnableReply ? 'text-white/80' : 'text-white/60'}`}>
                Reply
              </button>
              <span className="text-sm text-white/60 inline-flex items-center">{createAt.toDate().toDateString()}</span>
            </div>
            {isEnableReply && <InputComment />}
          </div>
        </div>
      </div>
      {children && <ul>{children}</ul>}
    </li>
  );
};

export default ParentComment;

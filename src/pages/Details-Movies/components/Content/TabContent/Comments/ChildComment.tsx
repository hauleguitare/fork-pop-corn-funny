import { IConvertReplies } from '@src/@types/__global__';
import { useAuth } from '@src/services/context/Auth';
import * as React from 'react';
import ReactionBarWrapper from './ReactionBarWrapper';
import GuestProfile from '@src/asserts/images/guest_profile.png';

interface IChildCommentProps {
  type: string;
  movieId: number;
  reply: IConvertReplies;
}

const ChildComment: React.FunctionComponent<IChildCommentProps> = (props) => {
  const { type, movieId, reply } = props;
  const { sender, data } = reply;
  const auth = useAuth();

  const handleOnReaction = async (reactionType: string) => {
    if (!auth) {
      return;
    }
  };

  return (
    <li>
      <div className="pl-8 pb-8 relative">
        <div className="flex">
          <img
            src={sender.images.photoURL ? sender.images.photoURL : GuestProfile}
            alt="photoURL"
            className=" object-cover w-12 h-12 rounded-full"
          />
          <div className="mx-4 w-full ">
            <div className="py-2 px-4 bg-dark-smooth-on-surface text-sm rounded-lg relative">
              <span className="text-white/80">{sender.information.displayName}</span>
              <div className="py-2">
                <p className="text-white/60">{data.content}</p>
              </div>
              {/* <ShowReactions
                like_count={like_count}
                dislike_count={dislike_count}
                love_count={love_count}
                sad_count={sad_count}
                reactions={reactions}
              /> */}
            </div>
            <div className="text-white/80 inline-flex items-center gap-4 pt-4 px-4">
              <ReactionBarWrapper onReaction={handleOnReaction} />
              <span className="text-sm text-white/60 inline-flex items-center">
                {data.createAt.toDate().toDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChildComment;

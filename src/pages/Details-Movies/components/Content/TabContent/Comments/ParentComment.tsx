import { IConvertComment } from '@src/@types/__global__';
import { useAuth } from '@src/services/context/Auth';
import { createReplyDocument } from '@src/services/Firebase/Documents/addDocument';
import { useAppDispatch } from '@src/services/Store';
import * as React from 'react';
import ChildComment from './ChildComment';
import InputComment from './InputComment';
import ReactionBarWrapper from './ReactionBarWrapper';
import GuestProfile from '@src/asserts/images/guest_profile.png';

interface IParentCommentProps {
  children?: React.ReactNode;
  type: string;
  movieId: number;
  comment: IConvertComment;
}

const ParentComment: React.FunctionComponent<IParentCommentProps> = (props) => {
  const auth = useAuth();
  const { children, type, movieId, comment } = props;
  const { data, sender, replies } = comment;
  const [isEnableReply, setEnableReply] = React.useState(false);
  const dispatch = useAppDispatch();

  //Handle Event
  const handleOnEnableReply = (e: React.MouseEvent) => {
    setEnableReply(!isEnableReply);
  };

  const handleOnSubmitReply = async (value: string) => {
    if (!auth) {
      return;
    }
    // try {
    await createReplyDocument(type, movieId, auth.uid, '01GEXZZ1Q0W6FSNTWNK7FJ1SXR', value);
    // } catch (error) {}
  };

  const handleOnReaction = async (reactionType: string) => {
    if (!auth) {
      return;
    }
    console.log(reactionType);
  };

  return (
    <li>
      <div className="relative py-4">
        <div className="flex">
          <img
            src={sender.images.photoURL ? sender.images.photoURL : GuestProfile}
            alt={`photoURL`}
            className=" object-cover w-14 h-14 rounded-full"
          />
          <div className="mx-4 w-full">
            <div className="py-2 px-4  bg-dark-smooth-on-surface rounded-lg text-base relative">
              <span className="text-white/80">{sender.information.displayName}</span>
              <div className="py-2 pb-2">
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
              <button onClick={handleOnEnableReply} className={`${isEnableReply ? 'text-white/80' : 'text-white/60'}`}>
                Reply
              </button>
              <span className="text-sm text-white/60 inline-flex items-center">Just now</span>
            </div>

            {isEnableReply && <InputComment onSubmit={handleOnSubmitReply} />}
          </div>
        </div>
      </div>
      {replies && (
        <ul>
          {replies.map((reply) => (
            <ChildComment type={type} movieId={movieId} reply={reply} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ParentComment;

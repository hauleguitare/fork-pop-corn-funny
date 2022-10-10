import { IConvertComment } from '@src/@types/__global__';
import GuestProfile from '@src/asserts/images/guest_profile.png';
import { useAuth } from '@src/services/context/Auth';
import { createReplyDocument } from '@src/services/Firebase/Documents/addDocument';
import { deleteCommentDocument } from '@src/services/Firebase/Documents/deleteDocument';
import { AnimatePresence, motion } from 'framer-motion';
import {
  createReactionField,
  removeReactionField,
  updateContentCommentField,
  updateReactionField,
} from '@src/services/Firebase/Documents/updateDocument';
import { convertTimestamp } from '@src/utils/ConvertTimestamp';
import * as React from 'react';
import ChildComment from './ChildComment';
import InputComment from './InputComment';
import ReactionBarWrapper from './ReactionBarWrapper';
import SettingWrapper from './SettingWrapper';
import ShowReactions from './ShowReactions';
import { CommentVariants } from './reactionAnimation';

interface IParentCommentProps {
  type: string;
  movieId: number;
  comment: IConvertComment;
}

const ParentComment: React.FunctionComponent<IParentCommentProps> = (props) => {
  const auth = useAuth();
  const { type, movieId, comment } = props;
  const { data, sender, replies } = comment;
  const [isEnableReply, setEnableReply] = React.useState(false);
  const [isEnableEdit, setEnableEdit] = React.useState(false);
  const hasReaction = data.reactions.find((comment) => comment.uid === auth?.uid);

  //Handle Event
  const handleOnEnableReply = (e: React.MouseEvent) => {
    setEnableReply(!isEnableReply);
  };

  const handleOnSubmitReply = async (value: string) => {
    try {
      if (!auth) {
        return;
      }
      await createReplyDocument(type, movieId, auth.uid, data.id, value);
    } catch (error) {
      console.log(error);
    } finally {
      setEnableReply(!isEnableReply);
    }
  };

  const handleOnReaction = async (reactionType: string) => {
    try {
      if (!auth) {
        return;
      }
      // Case 1 if user don't reaction
      if (!hasReaction) {
        await createReactionField(type, movieId, auth.uid, reactionType, data.id);
      }
      // Case 2 if user have reaction
      if (hasReaction) {
        if (hasReaction.type === reactionType) {
          await removeReactionField(type, movieId, auth.uid, reactionType, data.id);
        }
        if (hasReaction.type !== reactionType) {
          await updateReactionField(type, movieId, auth.uid, reactionType, data.id);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleOnEdit = async () => {
    if (!auth) {
      return;
    }
    if (auth.uid === data.uid) {
      setEnableEdit(!isEnableEdit);
    }
  };

  const handleOnSubmitEdit = async (value: string) => {
    try {
      if (!auth) {
        return;
      }
      await updateContentCommentField('comments', type, movieId, data.id, value.trim());
    } catch (error) {
      console.log(error);
    } finally {
      setEnableEdit(!isEnableEdit);
    }
  };

  const handleOnDelete = async () => {
    if (!auth) {
      return;
    }
    if (auth.uid === data.uid) {
      await deleteCommentDocument('comments', type, movieId, data.id);
    }
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
              {auth?.uid === data.uid && <SettingWrapper onEdit={handleOnEdit} onDelete={handleOnDelete} />}
              <span className="text-white/80">{sender.information.displayName}</span>
              <div className="py-2 pb-2">
                <p className="text-white/60">{data.content}</p>
              </div>
              <ShowReactions
                like_count={data.like_count}
                dislike_count={data.dislike_count}
                love_count={data.love_count}
                sad_count={data.sad_count}
              />
              {isEnableEdit && <InputComment onSubmit={handleOnSubmitEdit} placeholder="Write your edit comments..." />}
            </div>

            <div className="text-white/80 inline-flex items-center gap-4 pt-4 px-4">
              {auth && (
                <React.Fragment>
                  <ReactionBarWrapper onReaction={handleOnReaction} hasReaction={hasReaction} />
                  <button
                    onClick={handleOnEnableReply}
                    className={`${isEnableReply ? 'text-white/80' : 'text-white/60'}`}
                  >
                    Reply
                  </button>
                </React.Fragment>
              )}

              <span className="text-sm text-white/60 inline-flex items-center">
                {convertTimestamp(data.createAt.seconds * 1000) !== 'Just now'
                  ? `${convertTimestamp(data.createAt.seconds * 1000)} ago`
                  : convertTimestamp(data.createAt.seconds * 1000)}
              </span>
              {data.isEdit && <span className="text-sm text-white/60 inline-flex items-center">edited</span>}
            </div>

            {isEnableReply && <InputComment onSubmit={handleOnSubmitReply} />}
          </div>
        </div>
      </div>
      {replies && (
        <ul>
          {replies.map((reply) => (
            <ChildComment key={reply.data.id} type={type} movieId={movieId} reply={reply} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ParentComment;

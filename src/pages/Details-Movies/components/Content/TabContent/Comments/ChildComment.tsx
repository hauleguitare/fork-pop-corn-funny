import { IConvertReplies } from '@src/@types/__global__';
import { useAuth } from '@src/services/context/Auth';
import * as React from 'react';
import ReactionBarWrapper from './ReactionBarWrapper';
import GuestProfile from '@src/asserts/images/guest_profile.png';
import ShowReactions from './ShowReactions';
import { motion } from 'framer-motion';
import {
  createReactionField,
  removeReactionField,
  updateContentCommentField,
  updateReactionField,
} from '@src/services/Firebase/Documents/updateDocument';
import { convertTimestamp } from '@src/utils/ConvertTimestamp';
import SettingWrapper from './SettingWrapper';
import { deleteCommentDocument } from '@src/services/Firebase/Documents/deleteDocument';
import InputComment from './InputComment';
import { CommentVariants } from './reactionAnimation';

interface IChildCommentProps {
  type: string;
  movieId: number;
  reply: IConvertReplies;
}

const ChildComment: React.FunctionComponent<IChildCommentProps> = (props) => {
  const { type, movieId, reply } = props;
  const { sender, data } = reply;
  const [isEnableEdit, setEnableEdit] = React.useState(false);
  const auth = useAuth();
  const hasReaction = data.reactions.find((comment) => comment.uid === auth?.uid);

  const handleOnReaction = async (reactionType: string) => {
    try {
      if (!auth) {
        return;
      }
      // Case 1 if user don't reaction
      if (!hasReaction) {
        await createReactionField(type, movieId, auth.uid, reactionType, data.id, true);
      }
      // Case 2 if user have reaction
      if (hasReaction) {
        if (hasReaction.type === reactionType) {
          await removeReactionField(type, movieId, auth.uid, reactionType, data.id, true);
        }
        if (hasReaction.type !== reactionType) {
          await updateReactionField(type, movieId, auth.uid, reactionType, data.id, true);
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
      await updateContentCommentField('replies', type, movieId, data.id, value.trim());
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
      await deleteCommentDocument('replies', type, movieId, data.id);
    }
  };

  return (
    <li>
      <div className="pl-8 pb-4 relative">
        <div className="flex">
          <img
            src={sender.images.photoURL ? sender.images.photoURL : GuestProfile}
            alt="photoURL"
            className=" object-cover w-12 h-12 rounded-full"
          />
          <div className="mx-4 w-full ">
            <div className="py-2 px-4 bg-dark-smooth-on-surface text-sm rounded-lg relative">
              {auth?.uid === data.uid && <SettingWrapper onEdit={handleOnEdit} onDelete={handleOnDelete} />}
              <span className="text-white/80">{sender.information.displayName}</span>
              <div className="py-2">
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
            <div className="text-white/80 inline-flex items-center gap-4 pt-4 px-4 relative">
              {auth && <ReactionBarWrapper onReaction={handleOnReaction} hasReaction={hasReaction} />}

              <span className="text-sm text-white/60 inline-flex items-center">
                {convertTimestamp(data.createAt.seconds * 1000) !== 'Just now'
                  ? `${convertTimestamp(data.createAt.seconds * 1000)} ago`
                  : convertTimestamp(data.createAt.seconds * 1000)}
              </span>
              {data.isEdit && <span className="text-sm text-white/60 inline-flex items-center">edited</span>}
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

export default ChildComment;

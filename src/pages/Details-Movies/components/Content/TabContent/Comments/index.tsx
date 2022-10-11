import { IComment, IReply } from '@src/@types/__Firebase__';
import useCurrentViewPort from '@src/hooks/useCurrentViewPort';
import { useAuth } from '@src/services/context/Auth';
import { db } from '@src/services/Firebase';
import { createCommentDocument } from '@src/services/Firebase/Documents/addDocument';
import { readSingleCommentDocument, readSingleReplyDocument } from '@src/services/Firebase/Documents/readDocument';
import { useAppDispatch, useAppSelector } from '@src/services/Store';
import {
  addComment,
  addReply,
  removeComment,
  removeReply,
  updateComment,
  updateReply,
} from '@src/services/Store/slices/commentsSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import { motion } from 'framer-motion';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import { Link } from 'react-router-dom';
import InputComment from './InputComment';
import ParentComment from './ParentComment';

interface ICommentDetailsProps {
  movieId: number;
  type: string;
}

const CommentDetails: React.FunctionComponent<ICommentDetailsProps> = (props) => {
  const { movieId, type } = props;
  const auth = useAuth();
  const comments = useAppSelector((root) => root.comments.data);
  const dispatch = useAppDispatch();
  const { width, isMobile } = useCurrentViewPort();
  // Use Effect
  React.useEffect(() => {
    if (!auth) {
      return;
    }
    const rootCommentsCollectionRef = collection(db, 'comments');
    const commentsCollectionRef = collection(rootCommentsCollectionRef, type, movieId.toString());
    const unSubcribeComments = onSnapshot(commentsCollectionRef, (snapshot) => {
      snapshot.docChanges().forEach(async (result) => {
        const dataChange = result.doc.data() as IComment;
        if (result.type === 'modified') {
          dispatch(updateComment(dataChange));
        }
        if (result.type === 'added') {
          const newData = await readSingleCommentDocument(type, movieId, dataChange.id);
          if (!newData) {
            return;
          }
          dispatch(addComment(newData));
        }

        if (result.type === 'removed') {
          dispatch(removeComment(dataChange.id));
        }
      });
    });

    const rootRepliesCollectionRef = collection(db, 'replies');
    const repliesCollectionRef = collection(rootRepliesCollectionRef, type, movieId.toString());
    const unSubcribeReplies = onSnapshot(repliesCollectionRef, (snapshot) => {
      snapshot.docChanges().forEach(async (result) => {
        const dataChange = result.doc.data() as IReply;
        if (result.type === 'modified') {
          dispatch(updateReply(dataChange));
        }

        if (result.type === 'added') {
          const newData = await readSingleReplyDocument(type, movieId, dataChange.id);
          if (!newData) {
            return;
          }
          dispatch(addReply(newData));
        }

        if (result.type === 'removed') {
          dispatch(removeReply(dataChange.id));
        }
      });
    });
    return () => {
      unSubcribeComments();
      unSubcribeReplies();
    };
  }, []);

  const handleOnSubmitComment = async (value: string) => {
    if (!auth) {
      return;
    }
    try {
      await createCommentDocument(type, movieId, auth.uid, value);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="pt-4 mx-4">
      {comments ? (
        <ul>
          {comments.map((comment) => (
            <ParentComment key={comment.data.id} type={type} movieId={movieId} comment={comment} />
          ))}
        </ul>
      ) : (
        <div className="flex flex-col items-center text-center justify-center up-mobile:text-xl text-base text-dark-smooth-text-default">
          {auth ? (
            <span>There are currently no comments, would you like to comment on this movie?</span>
          ) : (
            <React.Fragment>
              <span>If you want to comment, please join by logging in to your account to be able to comment.</span>
              <span>
                If you don't have one, don't worry,{' '}
                <Link to={'/signup'} className="underline text-blue-primary">
                  click here
                </Link>{' '}
                to go to the registration page.
              </span>
            </React.Fragment>
          )}
        </div>
      )}

      <InputComment onSubmit={handleOnSubmitComment} placementFloating={isMobile} />
    </div>
  );
};

export default CommentDetails;

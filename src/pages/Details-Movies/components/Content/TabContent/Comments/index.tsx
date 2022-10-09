import { IComment } from '@src/@types/__Firebase__';
import { useAuth } from '@src/services/context/Auth';
import { db } from '@src/services/Firebase';
import { createCommentDocument } from '@src/services/Firebase/Documents/addDocument';
import { readSingleCommentDocument } from '@src/services/Firebase/Documents/readDocument';
import { useAppDispatch, useAppSelector } from '@src/services/Store';
import { addComment, updateComment } from '@src/services/Store/slices/commentsSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import * as React from 'react';
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

  // Use Effect
  React.useEffect(() => {
    if (!auth) {
      return;
    }
    const rootCollectionRef = collection(db, 'comments');
    const commentsCollectionRef = collection(rootCollectionRef, type, movieId.toString());
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
      });
    });
    return () => {
      unSubcribeComments();
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
            <ParentComment type={type} movieId={movieId} comment={comment} />
          ))}
        </ul>
      ) : (
        <div>Not Found comments</div>
      )}

      <InputComment onSubmit={handleOnSubmitComment} />
    </div>
  );
};

export default CommentDetails;

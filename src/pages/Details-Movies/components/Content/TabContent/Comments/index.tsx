import { IComment, IResponseComment } from '@src/@types/__Firebase__';
import useCurrentViewPort from '@src/hooks/useCurrentViewPort';
import { useAuth } from '@src/services/context/Auth';
import { readCommentDocument } from '@src/services/Firebase/Collection/createCollection';
import * as React from 'react';
import ChildComment from './ChildComment';
import InputComment from './InputComment';
import ParentComment from './ParentComment';

interface ICommentDetailsProps {}

const CommentDetails: React.FunctionComponent<ICommentDetailsProps> = (props) => {
  const auth = useAuth();
  const [comments, setComments] = React.useState<IResponseComment>({ comments: [] });
  React.useEffect(() => {
    const getData = async () => {
      try {
        await readCommentDocument('movie', 66732, (data) => {
          setComments(data);
        });
      } catch (error: any) {
        console.log(error);
      }
    };
    getData();
  }, []);

  const { width, isMobile } = useCurrentViewPort();
  return (
    <div className="pt-4 mx-4">
      <ul>
        {comments.comments.map((val) => (
          <ParentComment {...val} />
        ))}
      </ul>
    </div>
  );
};

export default CommentDetails;

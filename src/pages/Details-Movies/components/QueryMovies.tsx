import { ICommentStore, IResponseComment } from '@src/@types/__Firebase__';
import { IDetailAbstractMovie } from '@src/@types/__movies__';
import { ICredits, IExternal, Images, ISimilar, IVideos } from '@src/@types/__movies__/append_to_response';
import { fetchMovie } from '@src/api';
import { db } from '@src/services/Firebase';
import { readCommentDocument, readUserDocument } from '@src/services/Firebase/Collection/readDocument';
import { useAppDispatch } from '@src/services/Store';
import { unmountComments, updateComments } from '@src/services/Store/slices/commentsSlice';
import { useQuery } from '@tanstack/react-query';
import { collection, onSnapshot, query } from 'firebase/firestore';
import * as React from 'react';
import BannerSection from './Banner';
import BannerLoading from './Banner/Loading';
import ContentSection from './Content';
import ContentLoading from './Content/Loading';

interface IQueryMoviesProps {
  type: string;
  movieId: number;
}

export type AppendToResponse = Pick<IExternal, 'external_ids'> &
  Pick<Images, 'images'> &
  Pick<IVideos, 'videos'> &
  Pick<ISimilar, 'similar'> &
  Pick<ICredits, 'credits'>;

const getCommentDetails = async (comment: ICommentStore): Promise<IResponseComment> => {
  const sender = await readUserDocument(comment.uid);
  if (comment.comments.length >= 1) {
    const temp = await Promise.all(
      comment.comments.map(async (reply) => {
        const senderReply = await readUserDocument(reply.uid);
        return {
          sender: senderReply,
          comment: reply,
        };
      })
    );
    return {
      sender,
      comment: {
        ...comment,
        comments: temp,
      },
    };
  }
  return {
    sender,
    comment: {
      ...comment,
      comments: [],
    },
  };
};

const queryComments = async (type: 'movie' | 'tv', movieId: string | number) => {
  try {
    const listComments = await readCommentDocument(type, movieId);
    const commentsDetails = await Promise.all(
      listComments.map(async (comment) => {
        return getCommentDetails(comment);
      })
    );
    return commentsDetails;
  } catch (error) {
    console.log(error);
  }
};

const QueryMovies: React.FunctionComponent<IQueryMoviesProps> = (props) => {
  const { type, movieId } = props;
  const dispatch = useAppDispatch();

  // Query Comments
  React.useEffect(() => {
    if (type !== 'movie' && type !== 'tv') {
      return;
    }
    console.log('run effect');
    const rootCollectionRef = collection(db, 'comments');
    const collectionRef = query(collection(rootCollectionRef, type, movieId.toString()));
    const unsubcribe = onSnapshot(collectionRef, (snapshot) => {
      const getComments = async () => {
        const commentsDetails = await queryComments(type, movieId);
        if (commentsDetails) {
          dispatch(updateComments(commentsDetails));
        }
      };
      getComments();
    });

    return () => {
      unsubcribe();
      dispatch(unmountComments());
    };
  }, []);

  // Query data API
  const { data, isLoading, isError, error, isFetching } = useQuery<IDetailAbstractMovie & AppendToResponse, Error>(
    [`detail-movies-${type}-${movieId}`],
    () => {
      return fetchMovie<IDetailAbstractMovie & AppendToResponse>(type, movieId, [
        'external_ids',
        'videos',
        'images',
        'similar',
        'credits',
      ]);
    }
  );

  if (isError) {
    console.log(error);
  }

  if (isLoading) {
    return (
      <React.Fragment>
        <BannerLoading />
        <ContentLoading />
      </React.Fragment>
    );
  }

  return (
    <div>
      {data && (
        <React.Fragment>
          <BannerSection data={data} type={type} />
          <ContentSection data={data} type={type} />
        </React.Fragment>
      )}
    </div>
  );
};

export default QueryMovies;

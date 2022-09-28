import FallBackBackdrop from '@src/asserts/images/fallback_backdrop.png';
import useCurrentViewPort from '@src/hooks/useCurrentViewPort';
import { GenreContext } from '@src/services/context/Genres';
import { removeReview } from '@src/services/Store/slices/reviewMovieSlice';
import { RootState } from '@src/services/Store';
import React, { Fragment, useEffect, useState } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useDispatch, useSelector } from 'react-redux';
import ListGenres from '../ListGenres';
import RatingStar from '../RatingStar';

interface IReviewMovieProps {
  widthImage?: string;
}

const ReviewMovie: React.FunctionComponent<IReviewMovieProps> = (props) => {
  const { widthImage } = props;
  const { width, isMobile } = useCurrentViewPort();
  const dispatch = useDispatch();
  const reviewState = useSelector((state: RootState) => state.reviewMovie.value);
  return (
    <div
      className={`fixed overflow-auto overscroll-contain top-0 left-0 bottom-0 w-full h-full bg-dark-smooth-surface z-10 ${
        reviewState ? ' translate-x-0 delay-150' : 'translate-x-[-100%]'
      }  transition-all duration-200 ease-linear`}
    >
      {reviewState && (
        <Fragment>
          <button
            onClick={() => {
              dispatch(removeReview());
            }}
            className="text-white fixed z-10 top-0 left-0 w-10 h-10 mx-4 my-4 rounded-full bg-dark-smooth-button-default/60"
          >
            <GrFormPrevious className="w-full h-full" />
          </button>
          <div className="object-cover relative">
            <img
              src={
                reviewState.movie?.poster_path
                  ? `https://image.tmdb.org/t/p/${widthImage}/${reviewState.movie.poster_path}`
                  : FallBackBackdrop
              }
            />
            <div className="absolute bottom-0 right-0 left-0 h-full bg-gradient-to-b to-dark-smooth-theme via-dark-smooth-theme/45 from-transparent "></div>
          </div>
          <div className="text-white flex flex-col mx-4 mb-8 mt-4">
            <span className="text-3xl font-merriweather text-dark-smooth-primary/90 py-4">
              {reviewState.movie.name?.replace('-', ' ') ?? reviewState.movie.title?.replace('-', ' ') ?? ''}
            </span>
            <GenreContext.Consumer>
              {(val) => (
                <ListGenres
                  className="flex flex-row gap-2 pb-4"
                  genreCtx={val}
                  type={reviewState.media_type}
                  genres_id={reviewState.movie.genre_ids}
                />
              )}
            </GenreContext.Consumer>
            <RatingStar vote_average={reviewState.movie.vote_average} />
            <span className="text-dark-smooth-text-default font-roboto text-2xl">Overview</span>
            <p className="text-dark-smooth-text-default/80 text-lg mt-4 pt-4 font-roboto bg-dark-smooth-on-surface px-2 py-2 rounded-lg">
              {reviewState.movie.overview}
            </p>
          </div>
        </Fragment>
      )}
    </div>
  );
};

export default ReviewMovie;
ReviewMovie.defaultProps = {
  widthImage: 'original',
};

//${reviewMovie ? 'translate-x-[100%]' : 'translate-x-[-100%]'}

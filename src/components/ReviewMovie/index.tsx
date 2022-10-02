import FallBackBackdrop from '@src/asserts/images/fallback_backdrop.png';
import useCurrentViewPort from '@src/hooks/useCurrentViewPort';
import { GenreContext } from '@src/services/context/Genres';
import { RootState } from '@src/services/Store';
import { removeReview } from '@src/services/Store/slices/reviewMovieSlice';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { GrFormPrevious } from 'react-icons/gr';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useDispatch, useSelector } from 'react-redux';
import ListGenres from '../ListGenres';
import ModalTemplete from '../ModalTemplete';
import RatingStar from '../RatingStar';

interface IReviewMovieProps {}

const ReviewMovie: React.FunctionComponent<IReviewMovieProps> = (props) => {
  const { width, isMobile } = useCurrentViewPort();
  const dispatch = useDispatch();

  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      dispatch(removeReview());
    }
  };
  const reviewState = useSelector((state: RootState) => state.reviewMovie.value);
  return (
    <AnimatePresence>
      {reviewState && (
        <Fragment>
          {isMobile ? (
            <motion.div
              initial={{
                x: '-100%',
              }}
              animate={{
                x: 0,
              }}
              transition={{
                duration: 0.5,
                type: 'spring',
              }}
              exit={{
                x: '-100%',
              }}
              className={`fixed overflow-auto overscroll-contain top-0 left-0 bottom-0 w-full h-full bg-dark-smooth-surface z-10`}
            >
              <button
                onClick={() => {
                  dispatch(removeReview());
                }}
                className="text-white fixed z-10 top-0 left-0 w-10 h-10 mx-4 my-4 rounded-full bg-dark-smooth-button-default/60"
              >
                <GrFormPrevious className="w-full h-full" />
              </button>
              <div className="object-cover relative">
                <LazyLoadImage
                  src={
                    reviewState.movie?.poster_path
                      ? `https://image.tmdb.org/t/p/w780/${reviewState.movie.poster_path}`
                      : FallBackBackdrop
                  }
                  effect={'opacity'}
                />
                <div className="absolute bottom-0 right-0 left-0 h-full bg-gradient-to-b to-dark-smooth-theme via-dark-smooth-theme/45 from-transparent "></div>
              </div>
              <div className="text-white flex flex-col mx-4 mb-8 mt-4">
                <div className="py-4">
                  <span className="text-3xl font-merriweather text-dark-smooth-primary/90">
                    {reviewState.movie.name?.replace('-', ' ') ?? reviewState.movie.title?.replace('-', ' ') ?? ''}
                  </span>
                </div>
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
            </motion.div>
          ) : (
            <ModalTemplete>
              <motion.div
                tabIndex={0}
                onBlur={handleOnBlur}
                initial={{
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                }}
                exit={{
                  opacity: 0,
                  scale: 0,
                }}
                transition={{
                  type: 'spring',
                  duration: 0.8,
                }}
                className="text-white min-w-[600px] max-h-screen bg-dark-smooth-surface translate-y-8 rounded-lg overflow-scroll overscroll-contain"
              >
                <button
                  onClick={() => {
                    dispatch(removeReview());
                  }}
                  className="text-white fixed z-10 top-0 left-0 w-10 h-10 mx-4 my-4 rounded-full bg-dark-smooth-button-default/60"
                >
                  <GrFormPrevious className="w-full h-full" />
                </button>
                <div className="object-cover relative">
                  <LazyLoadImage
                    src={
                      reviewState.movie?.poster_path
                        ? `https://image.tmdb.org/t/p/w1280/${reviewState.movie.backdrop_path}`
                        : FallBackBackdrop
                    }
                    effect={'opacity'}
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

                  <div className="pt-4">
                    <span className="text-dark-smooth-text-default font-roboto text-2xl">Overview</span>
                  </div>
                  <div className="my-4 py-4">
                    <p className="text-dark-smooth-text-default/80 text-lg font-roboto bg-dark-smooth-on-surface px-2 py-2 rounded-lg">
                      {reviewState.movie.overview}
                    </p>
                  </div>
                </div>
              </motion.div>
            </ModalTemplete>
          )}
        </Fragment>
      )}
    </AnimatePresence>
  );
};

export default ReviewMovie;

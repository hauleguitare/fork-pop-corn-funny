import FallBackBackdrop from '@src/asserts/images/fallback_backdrop.png';
import useCurrentViewPort from '@src/hooks/useCurrentViewPort';
import { GenreContext } from '@src/services/context/Genres';
import { RootState } from '@src/services/Store';
import { removeReview } from '@src/services/Store/slices/reviewMovieSlice';
import { ConvertBeautifulURL } from '@src/utils/ConvertBeautifulURL';
import { AnimatePresence, motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { BiPlayCircle } from 'react-icons/bi';
import { BsArrowLeftCircleFill, BsBookmarksFill, BsShareFill } from 'react-icons/bs';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ListGenres from '../ListGenres';
import ModalTemplete from '../ModalTemplete';
import RatingStar from '../RatingStar';

interface IModalMoviesProps {}

const ModalMovies: React.FunctionComponent<IModalMoviesProps> = (props) => {
  const { width, isMobile } = useCurrentViewPort();
  const dispatch = useDispatch();
  const reviewState = useSelector((state: RootState) => state.reviewMovie.value);
  const navigate = useNavigate();

  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      dispatch(removeReview());
    }
  };

  const handleOnViewDetail = () => {
    if (!reviewState) {
      return;
    }
    dispatch(removeReview());
    const url = ConvertBeautifulURL(reviewState.movie.id, reviewState.movie.title ?? reviewState.movie.name) ?? '404';
    const type = reviewState.media_type;
    navigate(`${type}/${url}`, {
      replace: true,
    });
  };

  const handleOnClickWatch = () => {
    if (!reviewState) {
      return;
    }
    dispatch(removeReview());
    const url = ConvertBeautifulURL(reviewState.movie.id, reviewState.movie.title ?? reviewState.movie.name) ?? '404';
    const type = reviewState.media_type;
    navigate(`${type}/${url}/watch${type === 'tv' ? '?season=1&ep=1' : ''}`);
  };

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
                className="fixed z-10 top-0 left-0 w-8 h-8 overflow-hidden mx-4 my-4 group"
              >
                <BsArrowLeftCircleFill className="fill-white/80 opacity-60 w-full h-full group-hover:opacity-100 duration-150 ease-linear transition-opacity" />
              </button>

              <div className="fixed z-10 top-0 right-0 mx-4 my-4 flex gap-4">
                <button className=" w-8 h-8 overflow-hidden">
                  <BsShareFill className="fill-white opacity-60 w-full h-full group-hover:opacity-100 duration-150 ease-linear transition-opacity" />
                </button>

                <button className="w-8 h-8 overflow-hidden group">
                  <BsBookmarksFill className="fill-white opacity-60 w-full h-full group-hover:opacity-100 duration-150 ease-linear transition-opacity" />
                </button>
              </div>

              <div className="object-cover relative">
                <LazyLoadImage
                  src={
                    reviewState.movie?.poster_path
                      ? `https://image.tmdb.org/t/p/w780/${reviewState.movie.poster_path}`
                      : FallBackBackdrop
                  }
                  effect={'opacity'}
                />
                <div className="absolute bottom-0 right-0 left-0 h-full bg-gradient-to-b to-dark-smooth-theme via-dark-smooth-theme/45 from-transparent ">
                  <button
                    onClick={handleOnViewDetail}
                    className="absolute bottom-4 right-4 text-white py-2 px-2 bg-blue-primary rounded-lg opacity-60 hover:opacity-100 z-20 duration-150 transition-opacity ease-linear"
                  >
                    More Details
                  </button>
                  <button className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">Hello</button>
                </div>
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
                  y: '100%',
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                exit={{
                  opacity: 0,
                  y: '100%',
                }}
                transition={{
                  type: 'spring',
                  duration: 0.8,
                  delay: 0.2,
                }}
                className="text-white min-w-[600px] max-h-screen bg-dark-smooth-surface translate-y-8 rounded-lg overflow-scroll overscroll-contain"
              >
                <button
                  onClick={() => {
                    dispatch(removeReview());
                  }}
                  className="fixed z-10 top-0 left-0 w-8 h-8 overflow-hidden mx-4 my-4 group"
                >
                  <BsArrowLeftCircleFill className="fill-white/80 opacity-60 w-full h-full group-hover:opacity-100 duration-150 ease-linear transition-opacity" />
                </button>

                <div className="fixed z-10 top-0 right-0 mx-4 my-4 flex gap-4">
                  <button className="w-8 h-8 overflow-hidden group">
                    <BsShareFill className="fill-white opacity-60 w-full h-full group-hover:opacity-100 duration-150 ease-linear transition-opacity" />
                  </button>

                  <button className="w-8 h-8 overflow-hidden group">
                    <BsBookmarksFill className="fill-white opacity-60 w-full h-full group-hover:opacity-100 duration-150 ease-linear transition-opacity" />
                  </button>
                </div>

                <div className="object-cover relative">
                  <LazyLoadImage
                    src={
                      reviewState.movie?.backdrop_path
                        ? `https://image.tmdb.org/t/p/w1280/${reviewState.movie.backdrop_path}`
                        : FallBackBackdrop
                    }
                    effect={'opacity'}
                  />
                  <div className="absolute bottom-0 right-0 left-0 h-full bg-gradient-to-b to-dark-smooth-theme via-dark-smooth-theme/45 from-transparent group">
                    <button
                      onClick={handleOnViewDetail}
                      className="absolute bottom-4 right-4 text-white py-2 px-2 bg-blue-primary rounded-lg opacity-60 hover:opacity-100 z-20 duration-150 transition-opacity ease-linear"
                    >
                      More Details
                    </button>
                    <button
                      onClick={handleOnClickWatch}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:visible invisible"
                    >
                      <BiPlayCircle
                        size={'60px'}
                        className="group-hover:visible group-hover:scale-100 hover:opacity-100 invisible scale-125 fill-white opacity-50 transition duration-150 ease-in"
                      />
                    </button>
                  </div>
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

export default ModalMovies;

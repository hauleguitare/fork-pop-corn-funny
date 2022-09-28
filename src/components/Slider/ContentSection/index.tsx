import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper';
import { IAbstractMovie } from '@src/@types/__movies__';
import Card from '@src/components/Card';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { ICategory } from '@src/@types/__global__';
import { useDispatch } from 'react-redux';
import { activeReview } from '@src/services/Store/slices/reviewMovieSlice';

interface IContentSliderProps {
  data: IAbstractMovie[];
  type: ICategory;
}

const ContentSlider: React.FunctionComponent<IContentSliderProps> = (props) => {
  const { data, type } = props;
  const dispatch = useDispatch();
  return (
    <Swiper
      slidesPerView={'auto'}
      preventClicksPropagation
      preventClicks={false}
      slidesPerGroup={7}
      modules={[Navigation]}
      watchSlidesProgress
      breakpoints={{
        370: {
          width: 460,
          slidesPerGroup: 1,
        },
        640: {
          width: 640,
          slidesPerGroup: 2,
        },
        768: {
          width: 768,
          slidesPerGroup: 3,
        },
        1024: {
          width: 1024,
          slidesPerGroup: 5,
        },
        1280: {
          width: 1280,
          slidesPerGroup: 5,
        },
      }}
      loop={true}
      spaceBetween={30}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
    >
      {data.map((item) => (
        <SwiperSlide
          key={item.id}
          className="!w-44"
          onClick={() => {
            dispatch(
              activeReview({
                movie: item,
                media_type: type.id,
              })
            );
          }}
        >
          <Card
            className="pb-8"
            widthSkeleton="176px"
            heightSkeleton="263px"
            id={item.id}
            title={item.title ?? item.name ?? 'Unknown name'}
            img={item.poster_path}
          />
        </SwiperSlide>
      ))}

      <div className="absolute top-0 left-0 bottom-0 w-10 flex items-center opacity-80 hover:opacity-100 backdrop-blur-lg bg-black/30 z-10 transition duration-150 rounded-tr-md rounded-br-md">
        <div className="swiper-button-prev h-full items-center flex">
          <GrPrevious size={'40px'} />
        </div>
      </div>
      <div className="absolute top-0 right-0 bottom-0 w-10 flex items-center opacity-80 hover:opacity-100 backdrop-blur-lg bg-black/30 z-10 transition duration-150 rounded-tl-md rounded-bl-md">
        <div className="swiper-button-next h-full items-center flex">
          <GrNext size={'40px'} />
        </div>
      </div>
    </Swiper>
  );
};

export default ContentSlider;

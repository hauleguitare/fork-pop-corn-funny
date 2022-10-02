import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { GrNext, GrPrevious } from 'react-icons/gr';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { ITrending } from '@src/@types/__movies__';
import { Link } from 'react-router-dom';
import { AiFillPlayCircle } from 'react-icons/ai';
import './bannerSlider.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface IBannerSliderProps {
  data: ITrending[];
}

const BannerSlider: React.FunctionComponent<IBannerSliderProps> = (props) => {
  const { data } = props;
  return (
    <Swiper
      slidesPerView={1}
      preventClicks={false}
      modules={[Autoplay, Pagination, Navigation]}
      loop={true}
      autoplay={{
        delay: 5000,
        disableOnInteraction: false,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={{
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }}
      className=""
    >
      {data.map((item) => (
        <SwiperSlide key={item.id}>
          <Link to={'/hello'} className="relative group object-cover">
            <div className="relative flex mx-auto justify-center">
              <img src={`https://image.tmdb.org/t/p/w1280${item.backdrop_path}`} alt="backdrop movie" />
              <div className="absolute inset-0 bg-stone-dark-lighting/40">
                <div className="absolute inset-0 w-16 h-16 up-tablet:w-20 up-tablet:h-20 z-20 mx-auto my-auto cursor-pointer">
                  <AiFillPlayCircle
                    size={'64px'}
                    className="opacity-50 group-hover:visible invisible transition-all ease-in duration-150 scale-125 group-hover:scale-100 fill-white/40 hover:fill-white"
                  />
                </div>
              </div>
              <div
                className="absolute inset-0 z-10 px-4 py-4 up-tablet:px-8 up-tablet:py-8 flex flex-col up-tablet:max-w-[50%]
        font-merriweather text-start bg-gradient-to-l to-stone-800/30 from-transparent h-full"
              >
                <span className="text-2xl up-tablet:text-4xl mb-0 up-tablet:mb-4 text-white font-bold capitalize flex-shrink-0">
                  {item.name ?? item.title}
                </span>
                <span className="text-lg up-tablet:text-xl text-white font-bold">{item.name ?? item.title}</span>
                <span className="text-gray-300/50 text-base">
                  {item.release_date?.toString() ?? item.first_air_date?.toString()}
                </span>
                <p className="text-gray-100/60 text-sm hidden up-mobile:block">{item.overview}</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}

      <div
        className="absolute bottom-0 hidden up-mobile:flex bg-stone-light-chocolate/50
 hover:opacity-100 opacity-60 rounded-xl z-10  flex-row items-center justify-center
  max-w-[120px] max-h-[60px] w-[60px] h-[40px] up-mobile:w-full up-mobile:h-full mx-4 my-4
 "
      >
        <div className="swiper-button-prev">
          <GrPrevious
            fill={'white'}
            className="hover:translate-x-[-0.5rem] hover:scale-125 transition-transform ease-in up-mobile:w-[40px] up-mobile:h-[40px] max-w-[60px] max-h-[60px] w-[20px] h-[20px]"
          />
        </div>
        <div className="swiper-button-next">
          <GrNext
            fill={'white'}
            className="hover:translate-x-[0.5rem] hover:scale-110 transition-transform ease-in up-mobile:w-[40px] up-mobile:h-[40px] max-w-[60px] max-h-[60px] w-[20px] h-[20px]"
          />
        </div>
      </div>
    </Swiper>
  );
};

export default BannerSlider;

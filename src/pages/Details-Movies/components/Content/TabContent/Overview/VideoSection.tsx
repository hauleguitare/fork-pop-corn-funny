import { IVideos, Type } from '@src/@types/__movies__/append_to_response';
import * as React from 'react';
import ReactPlayer from 'react-player/lazy';

interface IVideoSectionProps {
  data: Pick<IVideos, 'videos'>;
}

const VideoSection: React.FunctionComponent<IVideoSectionProps> = (props) => {
  const { data } = props;
  const videoTrailer = data.videos.results.find((val) => {
    return val.type === Type.Trailer;
  });
  return (
    <section className="px-4 py-4 w-full">
      <div className="pb-4">
        <p className="text-xl text-white/80 inline-block">Trailer</p>
      </div>
      <div className="up-mobile:h-[520px] h-[300px] max-w-[1000px]">
        <ReactPlayer url={`https://youtube.com/watch?v=${videoTrailer?.key}`} controls width={'100%'} height={'100%'} />
      </div>
    </section>
  );
};

export default VideoSection;

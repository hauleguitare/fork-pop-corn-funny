import { Images, IVideos } from '@src/@types/__movies__/append_to_response';
import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/opacity.css';

interface IMediaSectionProps {
  data: Pick<Images, 'images'>;
}

const MediaSection: React.FunctionComponent<IMediaSectionProps> = (props) => {
  const { data } = props;
  const [tabSection, setTabSection] = React.useState('btn_tab_media_backdrops');

  const handleOnClickSwitchTab = (e: React.MouseEvent) => {
    setTabSection(e.currentTarget.id);
  };

  return (
    <section className="py-4 px-4">
      <div className="flex pb-4">
        <p className="text-xl text-white/80 inline-block">Media</p>
        <div className="pl-4 flex gap-4 up-mobile:text-lg text-sm">
          <button
            id="btn_tab_media_backdrops"
            onClick={handleOnClickSwitchTab}
            className={
              tabSection === 'btn_tab_media_backdrops'
                ? 'text-dark-smooth-text-default'
                : 'text-dark-smooth-text-default/50'
            }
          >
            <p>
              Backdrops{' '}
              <span className="text-dark-smooth-text-default/50 text-sm up-mobile:text-base">
                ({data.images.backdrops.length})
              </span>
            </p>
          </button>

          <button
            onClick={handleOnClickSwitchTab}
            id="btn_tab_media_posters"
            className={
              tabSection === 'btn_tab_media_posters'
                ? 'text-dark-smooth-text-default'
                : 'text-dark-smooth-text-default/50'
            }
          >
            <p>
              Posters{' '}
              <span className="text-dark-smooth-text-default/50 text-sm up-mobile:text-base">
                ({data.images.posters.length})
              </span>
            </p>
          </button>
        </div>
      </div>
      <div className="overflow-y-hidden overflow-x-auto w-full">
        <ul className="flex py-4">
          {tabSection.replace('btn_tab_media_', '').toLocaleLowerCase() === 'backdrops' && (
            <React.Fragment>
              {data.images.backdrops.slice(0, 5).map((image) => (
                <li
                  key={image.file_path}
                  className="up-mobile:min-w-[500px] min-w-[268px] h-[132px] up-mobile:h-[263px] object-cover px-4"
                >
                  <LazyLoadImage
                    effect="opacity"
                    src={`https://image.tmdb.org/t/p/w500${image.file_path}`}
                    alt="images"
                  />
                </li>
              ))}
            </React.Fragment>
          )}

          {tabSection.replace('btn_tab_media_', '').toLocaleLowerCase() === 'posters' && (
            <React.Fragment>
              {data.images.posters.slice(0, 5).map((image) => (
                <li key={image.file_path} className="min-w-[185px] h-[230px] object-cover px-4">
                  <LazyLoadImage
                    effect="opacity"
                    src={`https://image.tmdb.org/t/p/w185${image.file_path}`}
                    alt="images"
                  />
                </li>
              ))}
            </React.Fragment>
          )}
        </ul>
      </div>
    </section>
  );
};

export default MediaSection;

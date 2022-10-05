import { IDetailAbstractMovie } from '@src/@types/__movies__';
import { ISimilar } from '@src/@types/__movies__/append_to_response';
import Card from '@src/components/Card';
import { ConvertBeautifulURL } from '@src/utils/ConvertBeautifulURL';
import * as React from 'react';

interface ISimilarSectionProps {
  data: Pick<ISimilar, 'similar'>;
  type: string;
}

const SimilarSection: React.FunctionComponent<ISimilarSectionProps> = (props) => {
  const { data, type } = props;
  return (
    <section className="px-4 py-4">
      <p className="text-xl text-white/80 inline-block pb-4">Similar</p>
      <ul className="flex max-w-full overflow-x-auto overflow-y-hidden">
        {data.similar.results.map((item) => (
          <Card
            className="w-[185px] mr-8 pb-4"
            img={item.poster_path}
            widthImageEndpoint={'w185'}
            title={item.title ?? item.name ?? 'Unknown name'}
            id={item.id}
            url={`/${type}/${ConvertBeautifulURL(item.id, item.title ?? item.name ?? '')}`}
          />
        ))}
      </ul>
    </section>
  );
};

export default SimilarSection;

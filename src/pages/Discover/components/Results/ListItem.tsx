import { ListResponse } from '@src/@types/__global__';
import { IAbstractMovie } from '@src/@types/__movies__';
import Card from '@src/components/Card';
import React, { Fragment } from 'react';

interface IListItemResultsProps {
  pages: ListResponse<IAbstractMovie>[];
}

const ListItemResults: React.FunctionComponent<IListItemResultsProps> = (props) => {
  const { pages } = props;
  return (
    <>
      {pages.map((page, idx) => (
        <Fragment key={idx}>
          {page.results.map((item) => (
            <li key={item.id}>
              <Card
                widthImageEndpoint="w185"
                title={item.title ?? item.name ?? ''}
                img={item.poster_path}
                id={item.id}
              />
            </li>
          ))}
        </Fragment>
      ))}
    </>
  );
};

export default ListItemResults;

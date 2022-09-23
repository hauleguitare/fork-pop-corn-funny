import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IOption } from '@src/@types/__global__';
import { OPTION_SORT } from '@src/constants/option-sort';
import React from 'react';
import FilterGenres from './FilterByGenre';
import FilterByReleaseDate from './FilterByReleaseDate';
import FilterByRuntime from './FilterByRuntime';
import SortBy from './SortBy';

interface IGroupFilterProps {
  type: string;
}

const GroupFilter: React.FunctionComponent<IGroupFilterProps> = (props) => {
  const { type } = props;
  const [parent] = useAutoAnimate({
    duration: 200,
    easing: 'ease-in-out',
  });

  return (
    <div className="shrink-0 flex-nowrap up-tablet:pl-0 pl-4 pr-4 up-tablet:w-[298px] w-full">
      <SortBy options={OPTION_SORT} />
      <div
        className="my-4 px-4 py-4 bg-white rounded-lg cursor-pointer"
        ref={parent as React.RefObject<HTMLDivElement>}
      >
        <p className="text-xl font-roboto py-2">Filter</p>
        <FilterGenres type={type} />
        <FilterByRuntime />
        <FilterByReleaseDate />
      </div>
    </div>
  );
};

export default GroupFilter;

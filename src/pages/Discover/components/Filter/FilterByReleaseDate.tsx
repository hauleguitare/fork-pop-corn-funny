import useReadParams from '@src/hooks/useReadParams';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

interface IFilterByReleaseDateProps {}

const FilterByReleaseDate: React.FunctionComponent<IFilterByReleaseDateProps> = (props) => {
  const [ReadParams] = useReadParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChangeDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    switch (e.target.id) {
      case 'from-date':
        setSearchParams({
          ...ReadParams,
          from: e.target.value,
        });
        break;

      case 'to-date':
        setSearchParams({
          ...ReadParams,
          to: e.target.value,
        });
        break;
      default:
        break;
    }
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="from-date" className="text-xl font-merriweather">
          From
        </label>
        <input
          type="date"
          id="from-date"
          name="from-date"
          value={searchParams.get('from') || '2018-01-01'}
          className="text-white text-lg outline-none bg-stone-light-chocolate px-2 py-2 rounded-md"
          onChange={handleOnChangeDate}
        />
      </div>
      <div className="flex justify-between items-center mb-4">
        <label htmlFor="to-date" className="text-xl font-merriweather">
          To
        </label>
        <input
          type="date"
          id="to-date"
          name="to-date"
          value={searchParams.get('to') || '2023-01-01'}
          className="text-white text-lg outline-none bg-stone-light-chocolate px-2 py-2 rounded-md"
          onChange={handleOnChangeDate}
        />
      </div>
    </div>
  );
};

export default FilterByReleaseDate;

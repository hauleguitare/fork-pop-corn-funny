import { useAutoAnimate } from '@formkit/auto-animate/react';
import { IOption } from '@src/@types/__global__';
import useReadParams from '@src/hooks/useReadParams';
import React, { useState } from 'react';
import { GrFormNext } from 'react-icons/gr';
import { useSearchParams } from 'react-router-dom';
import Select, { ActionMeta, GroupBase, SingleValue, StylesConfig } from 'react-select';

interface ISortByProps {
  options: IOption[];
}

const style: StylesConfig<IOption, false, GroupBase<IOption>> = {
  container: (styl) => ({ ...styl, marginTop: '1rem', minWidth: '100%', backgroundColor: '#1C1B1B' }),
  singleValue: (styl) => ({ ...styl, color: '#CE93D8' }),
  control: (styl) => ({ ...styl, cursor: 'pointer', backgroundColor: '#1C1B1B' }),
  option: (styl) => ({
    ...styl,
    cursor: 'pointer',
    color: '#DBD1D3',
    ':hover': { backgroundColor: '#CE93D8', color: '#FAFAFA' },
  }),
  menuList: (styl) => ({ ...styl, backgroundColor: '#2B2929' }),
};

const SortBy: React.FunctionComponent<ISortByProps> = (props) => {
  const { options } = props;
  const [openSort, setOpenSort] = useState(false);
  const [parent] = useAutoAnimate();
  const [ReadParams] = useReadParams();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleOnChange = (option: SingleValue<IOption>, actionMeta: ActionMeta<IOption>) => {
    if (option) {
      const sortBy = searchParams.get('sort_by');
      setSearchParams({
        ...ReadParams,
        sort_by: option.value,
      });
    }
  };
  return (
    <div
      className="my-4 px-4 py-4 bg-dark-smooth-surface rounded-lg cursor-pointer"
      ref={parent as React.RefObject<HTMLDivElement>}
    >
      <div
        onClick={() => {
          setOpenSort(!openSort);
        }}
        className="flex flex-row justify-between"
      >
        <p className="text-xl text-white/80 dark">Sort</p>
        <span>
          <GrFormNext
            className={`${openSort ? 'rotate-90' : 'rotate-0'} h-full w-full transition-transform duration-[200ms]`}
          />
        </span>
      </div>
      {openSort && (
        <div className="pt-2">
          <p className="cursor-text text-white/80">Sort Results by</p>
          <Select onChange={handleOnChange} options={options} styles={style} defaultValue={options[0]} />
        </div>
      )}
    </div>
  );
};

export default SortBy;

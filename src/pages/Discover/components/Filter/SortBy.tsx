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
  container: (styl) => ({ ...styl, marginTop: '1rem', minWidth: '100%' }),
  control: (styl) => ({ ...styl, cursor: 'pointer' }),
  option: (styl) => ({ ...styl, cursor: 'pointer' }),
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
    <div className="my-4 px-4 py-4 bg-white rounded-lg cursor-pointer" ref={parent as React.RefObject<HTMLDivElement>}>
      <div
        onClick={() => {
          setOpenSort(!openSort);
        }}
        className="flex flex-row justify-between"
      >
        <p className="text-base">Sort</p>
        <span>
          <GrFormNext
            className={`${openSort ? 'rotate-90' : 'rotate-0'} h-full w-full transition-transform duration-[200ms]`}
          />
        </span>
      </div>
      {openSort && (
        <div className="pt-2">
          <p className="cursor-text">Sort Results by</p>
          <Select onChange={handleOnChange} options={options} styles={style} defaultValue={options[0]} />
        </div>
      )}
    </div>
  );
};

export default SortBy;

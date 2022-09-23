import useReadParams from '@src/hooks/useReadParams';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useSearchParams } from 'react-router-dom';
import './FilterByRuntime.css';

const MAX_RANGE = 200;
const GAP_BETWEEN = 20;

interface IFilterByRunTimeProps {}

const FilterByRunTime: React.FunctionComponent<IFilterByRunTimeProps> = (props) => {
  const sliderRangeRef = useRef<HTMLDivElement>(null!);
  const [minRange, setMinRange] = useState(0);
  const [maxRange, setMaxRange] = useState(MAX_RANGE);
  const timeoutRef = useRef<any>(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const [ReadParams] = useReadParams();

  useEffect(() => {
    updateMinRangeBar(Number(searchParams.get('minRuntime')) ?? 0);
    updateMaxRangeBar(Number(searchParams.get('maxRuntime')) || 200);
  }, [location.search]);

  const updateMinRangeBar = (val: number) => {
    setMinRange(val);
    const leftOffset = (val / MAX_RANGE) * 100;
    sliderRangeRef.current.style.left = leftOffset + '%';
  };

  const updateMaxRangeBar = (val: number) => {
    setMaxRange(val);
    const rightOffset = 100 - (val / MAX_RANGE) * 100;
    sliderRangeRef.current.style.right = rightOffset + '%';
  };

  const handleSlideRange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (timeoutRef.current) {
      // clear listen timeout
      clearTimeout(timeoutRef.current);
    }
    switch (e.target.name) {
      case 'min-range':
        const _minRange = Number(e.target.value);
        updateMinRangeBar(maxRange - _minRange < GAP_BETWEEN ? maxRange - GAP_BETWEEN : _minRange);
        timeoutRef.current = setTimeout(() => {
          setSearchParams({
            ...ReadParams,
            minRuntime: e.target.value,
          });
        }, 1000);
        break;
      case 'max-range':
        const _maxRange = Number(e.target.value);
        updateMaxRangeBar(_maxRange - minRange < GAP_BETWEEN ? minRange + GAP_BETWEEN : _maxRange);

        setTimeout(() => {
          setSearchParams({
            ...ReadParams,
            maxRuntime: e.target.value,
          });
        }, 1000);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <p className="text-xl py-2 text-white/80">Runtime</p>
      <div className="flex justify-between">
        <span className="font-merriweather before:font-bold before:pr-2 before:text-dark-smooth-text-default after:text-dark-smooth-text-default after:pl-1 after:content-['min'] before:content-['From'] text-base text-dark-smooth-text-default">
          {minRange}
        </span>
        <span className="font-merriweather before:font-bold before:pr-2 before:text-dark-smooth-text-default after:text-dark-smooth-text-default after:pl-1 after:content-['min'] before:content-['To'] text-base text-dark-smooth-text-default">
          {maxRange}
        </span>
      </div>
      <div className="relative my-4 pb-2">
        <div ref={sliderRangeRef} className="absolute top-0 left-[0%] right-[0%] h-1 bg-dark-smooth-secondary"></div>
        <div className="relative">
          <input
            type="range"
            className="absolute top-0 left-0 appearance-none w-full h-1 p-0 [background:none] pointer-events-none tw-slider-range"
            min="0"
            max={MAX_RANGE}
            step="10"
            value={minRange}
            name="min-range"
            onChange={handleSlideRange}
          />
          <input
            type="range"
            className="absolute top-0 left-0 appearance-none w-full h-1 p-0 [background:none] pointer-events-none tw-slider-range"
            min="0"
            max={MAX_RANGE}
            step="10"
            value={maxRange}
            name="max-range"
            onChange={handleSlideRange}
          />
        </div>
      </div>
    </>
  );
};

export default FilterByRunTime;

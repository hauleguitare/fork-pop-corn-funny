import { IParams } from '@src/@types/__global__';
import { ISearchResult } from '@src/@types/__movies__';
import { fetchSearch } from '@src/api';
import React, { FormEvent, Fragment, useEffect, useRef, useState } from 'react';
import { BiMovie, BiSearchAlt } from 'react-icons/bi';
import { BsPerson, BsTv } from 'react-icons/bs';
import { IoIosClose } from 'react-icons/io';
import { SiSpinrilla } from 'react-icons/si';
import { Link, useNavigate } from 'react-router-dom';

interface ISearchBarProps {}

const initialCount = {
  movie: 0,
  tv: 0,
  person: 0,
};

const SearchBar: React.FunctionComponent<ISearchBarProps> = (props) => {
  /*
    state used to open this searchbar is used when the user clicks on the svg search button
    */
  const [isSearch, setOpenSearch] = useState<boolean>(false);

  /*
    This state will be the place to store the input every time the user presses or types in a certain character, to prevent continuous API calls, 
    I leave the default if the character === 0 will not make the call. call any api. See useEffect section for more details
  */
  const [searchQuery, setSearchQuery] = useState<string>('');

  /*
    Appear spinner when fetch data is Promise Pending
  */
  const [isLoading, setLoading] = useState<boolean>(false);
  /*
    This state is used to store the count variable each time resultSearch returns a list of the movies the user entered, 
    and I just want to get the title names they are interested in.
    This variable will cause most components to be rendered a few times more but I want to improve the user experience
  */
  const [countMediaType, setCountMediaType] = useState(initialCount);
  /*
    State stores movie lists when the user searches
  */
  const [searchSuggestion, setSearchSuggetion] = useState<ISearchResult[]>([]);

  /*
    UseRef
*/

  const timeoutRef = useRef<any>(null);
  const searchRef = useRef<HTMLInputElement>(null);

  /*
    Navigate
*/

  const navigate = useNavigate();

  /*
    Func Async FetchData
*/

  const handleGetRecommendation = async (query: IParams) => {
    const promise = fetchSearch('multi', query, 1);
    setLoading(true);
    promise.then((res) => {
      const count = res.results.reduce(handleCountRecommend, initialCount);
      setCountMediaType(count);
      setSearchSuggetion(res.results);
      setLoading(false);
    });
  };
  /*
    UseEffect 
*/
  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [isSearch]);

  useEffect(() => {
    if (timeoutRef) {
      clearTimeout(timeoutRef.current);
    }
    if (searchQuery.length === 0) {
      setSearchSuggetion([]);
      return;
    }
    timeoutRef.current = setTimeout(() => {
      handleGetRecommendation({
        query: searchQuery,
      });
    }, 500);
  }, [searchQuery]);

  /*
  Handle for Event ect like button, submit,...
  */

  const handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
  };

  const handleRefresh = (e: React.MouseEvent) => {
    setSearchQuery('');
    setOpenSearch(false);
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleCountRecommend = (acc: typeof initialCount, current: ISearchResult) => {
    switch (current.media_type) {
      case 'movie': {
        return {
          ...acc,
          movie: acc.movie + 1,
        };
      }
      case 'tv': {
        return {
          ...acc,
          tv: acc.tv + 1,
        };
      }
      case 'person': {
        return {
          ...acc,
          person: acc.person + 1,
        };
      }
      default:
        return acc;
    }
  };

  /*
  Render UI
 */

  return (
    <Fragment>
      <button
        onClick={() => {
          setOpenSearch(!isSearch);
        }}
        className="w-6 h-full"
      >
        <BiSearchAlt className="h-full w-full" />
      </button>
      {isSearch && (
        <div className="absolute top-[64px] h-10 left-0 right-0 bg-white/80 text-black">
          <form onSubmit={handleOnSubmit} className="py-2 relative container">
            <input
              onChange={handleOnChange}
              value={searchQuery}
              ref={searchRef}
              type={'text'}
              className="w-full h-full outline-none bg-transparent"
            />
          </form>
          {searchQuery.length >= 1 && (
            <Fragment>
              <button
                tabIndex={-1}
                onClick={() => setSearchQuery('')}
                className="absolute bottom-0 right-0 py-2 w-10 h-10 mr-8 up-laptop:mr-20"
              >
                <IoIosClose className="w-full h-full" />
              </button>
              <div className="absolute top-10 right-0 left-0 bg-white">
                {/* List render recommendation when user input */}
                <ul className="flex flex-col mt-2 container">
                  {/* I use countMediaType because I want to filter out words that are not in the types when users search to improve the user experience instead of searching for a meaningless word.  */}
                  {countMediaType.movie >= 1 && (
                    <li className="text-base text-black py-2 border-b-2">
                      <Link
                        onClick={handleRefresh}
                        to={`/search?type=movie&?query=${encodeURIComponent(searchQuery)}`}
                        className={'flex flex-row items-center justify-between'}
                      >
                        <p className="">{searchQuery}</p>
                        <span className="flex flex-row items-center gap-2 shrink-0">
                          in Movies
                          <BiMovie />
                        </span>
                      </Link>
                    </li>
                  )}
                  {countMediaType.tv >= 1 && (
                    <li className="text-base text-black py-2 border-b-2">
                      <Link
                        onClick={handleRefresh}
                        to={`/search?type=tv&query=${encodeURIComponent(searchQuery)}`}
                        className={'flex flex-row items-center justify-between'}
                      >
                        <p className="">{searchQuery}</p>
                        <span className="flex flex-row items-center gap-2 shrink-0">
                          in TV Shows
                          <BsTv />
                        </span>
                      </Link>
                    </li>
                  )}
                  {countMediaType.person >= 1 && (
                    <li className="text-base text-black py-2 border-b-2">
                      <Link
                        onClick={handleRefresh}
                        to={`/search?type=person&query=${encodeURIComponent(searchQuery)}`}
                        className={'flex flex-row items-center justify-between'}
                      >
                        <p className="">{searchQuery}</p>
                        <span className="flex flex-row items-center gap-2 shrink-0">
                          in Person
                          <BsPerson />
                        </span>
                      </Link>
                    </li>
                  )}
                  {countMediaType.movie === 0 && countMediaType.tv === 0 && countMediaType.person === 0 && (
                    <li className="text-base text-black py-2 border-b-2">
                      <span onClick={handleRefresh} className={'flex flex-row items-center justify-between'}>
                        Sorry not found that results...
                      </span>
                    </li>
                  )}

                  {/* Spinner will work when there is an api call looking for input and will remove from DOM when state changes === False */}
                  {isLoading ? (
                    <li className="flex justify-center text-base text-black py-2 px-4 border-b-2">
                      <SiSpinrilla className="animate-spin w-10 h-10" />
                    </li>
                  ) : (
                    searchSuggestion.slice(0, 9).map((item) => (
                      <li key={item.id} className="text-base italic font-light text-stone-600 py-2 border-b-2">
                        <Link
                          to={`/search?query=${encodeURIComponent(item.title ?? item.name ?? '')}`}
                          onClick={handleRefresh}
                        >
                          <p>{item.title ?? item.name ?? ''}</p>
                        </Link>
                      </li>
                    ))
                  )}
                </ul>
              </div>
            </Fragment>
          )}
        </div>
      )}
    </Fragment>
  );
};

export default SearchBar;

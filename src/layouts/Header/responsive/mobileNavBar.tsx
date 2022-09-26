import MenuList from '@src/components/MenuList';
import { MENU_LIST } from '@src/constants/index';
import React, { Fragment } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { FiSearch } from 'react-icons/fi';
import { RiCompassDiscoverFill, RiLoginBoxFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
interface IMobileNavBarProps {
  isOpenMenu: boolean;
  setOpenMenu: (isOpenMenu: boolean) => void;
}

const MobileNavBar: React.FunctionComponent<IMobileNavBarProps> = (props) => {
  const { isOpenMenu, setOpenMenu } = props;
  return (
    <Fragment>
      <nav
        className={`${
          isOpenMenu ? 'translate-x-100%' : 'translate-x-[-100%]'
        } fixed top-16 z-0 left-0 bottom-0 bg-dark-smooth-on-surface transition-transform duration-200 ease-in overscroll-contain overflow-y-scroll`}
      >
        <div className="text-dark-smooth-text-default ml-4 mt-4 pr-8">
          <ul className="mx-4 mt-4 pb-2 border-b-2 border-b-stone-700 text-xl">
            <li>
              <Link to={'/'} className="flex gap-4 items-center">
                <AiFillHome />
                <span>HOME</span>
              </Link>
            </li>
            <li className="flex flex-col">
              <div className="flex gap-4 items-center">
                <RiCompassDiscoverFill />
                <span>DISCOVER</span>
              </div>
              <ul className="flex flex-col ml-4 text-lg text-dark-smooth-text-default/60">
                <Link to={'/movie'}>Movies</Link>
                <Link to={'/tv'}>TV</Link>
              </ul>
            </li>
            <li>
              <Link to={'/search'} className="flex gap-4 items-center">
                <FiSearch />
                <span>SEARCH</span>
              </Link>
            </li>
            <li>
              <Link to={'/login'} className="flex gap-4 items-center">
                <RiLoginBoxFill />
                <span>LOGIN</span>
              </Link>
            </li>
            <li>
              <button className="flex gap-4 items-center">LOG OUT</button>
            </li>
          </ul>
          <MenuList
            list={MENU_LIST}
            className={'mx-4 mt-4 pb-2 border-b-2 border-b-stone-700 text-2xl capitalize'}
            childClassName="ml-4 text-lg text-dark-smooth-text-default/60"
          />
        </div>
      </nav>
      <div
        onClick={() => {
          setOpenMenu(!isOpenMenu);
        }}
        className={`${
          isOpenMenu ? 'visible bg-white/30' : 'invisible bg-transparent'
        } fixed top-16 left-0 right-0 bottom-0 -z-10 transition-all ease-linear duration-75`}
      ></div>
    </Fragment>
  );
};

export default MobileNavBar;

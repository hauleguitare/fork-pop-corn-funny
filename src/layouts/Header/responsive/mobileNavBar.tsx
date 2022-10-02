import GuestProfile from '@src/asserts/images/guest_profile.png';
import DropdownSubMenu from '@src/components/DropdownSubMenu';
import MenuList from '@src/components/MenuList';
import { MENU_LIST } from '@src/constants/index';
import { SignOut } from '@src/services/Firebase/Auth/SignOut/SignOut';
import { User } from 'firebase/auth';
import React, { Fragment, useEffect, useRef } from 'react';
import { AiFillHome } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { FiSearch } from 'react-icons/fi';
import { RiCompassDiscoverLine, RiLoginBoxFill } from 'react-icons/ri';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-lazy-load-image-component/src/effects/opacity.css';
import { ConvertCodeErrorFirebase } from '@src/utils/ConvertCodeErrorFirebase';
interface IMobileNavBarProps {
  isOpenMenu: boolean;
  setOpenMenu: (isOpenMenu: boolean) => void;
  auth: User | null;
  displayName?: string;
  photoURL?: string;
}

const MobileNavBar: React.FunctionComponent<IMobileNavBarProps> = (props) => {
  const { isOpenMenu, setOpenMenu, displayName, photoURL, auth } = props;
  const navRef = useRef<HTMLDivElement>(null);

  // Handle Event
  const handleOnBlur = (e: React.FocusEvent<HTMLElement, Element>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setOpenMenu(!isOpenMenu);
    }
  };

  const handleSignOut = async () => {
    const toastId = toast.loading('waiting for second');
    try {
      await SignOut();
      toast.update(toastId, {
        render() {
          return 'sign out success';
        },
        type: 'success',
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    } catch (error) {
      toast.update(toastId, {
        render() {
          return `sign out is fail, please try again ${error}`;
        },
        type: 'error',
        autoClose: 1000,
        closeButton: true,
        isLoading: false,
      });
    }
  };

  // Use Effect
  useEffect(() => {
    if (navRef) {
      if (isOpenMenu) {
        navRef.current?.focus();
      }
    }
  }, [isOpenMenu]);

  return (
    <Fragment>
      <nav
        ref={navRef}
        onBlur={handleOnBlur}
        tabIndex={0}
        className={`${
          isOpenMenu ? 'translate-x-100%' : 'translate-x-[-100%]'
        } fixed top-16 z-0 left-0 bottom-0 bg-dark-smooth-on-surface transition-transform duration-200 ease-in overscroll-contain overflow-y-scroll`}
      >
        <ToastContainer />
        <div className="min-w-[200px] text-dark-smooth-text-default ml-4 mt-4 bg-transparent">
          <div className="pb-4 ml-4">
            <div className="flex items-center gap-4 relative cursor-pointer">
              <div className="h-10 w-10 rounded-full overflow-hidden object-cover">
                <LazyLoadImage effect="opacity" src={photoURL ? photoURL : GuestProfile} referrerPolicy="no-referrer" />
              </div>
              <p className="font-roboto text-white/80 text-lg">{displayName ?? 'Guest'}</p>
            </div>
          </div>
          <ul className="mx-4 mt-4 pb-4 border-b-2 border-b-stone-700 text-xl flex flex-col justify-center gap-2">
            <li>
              <Link to={'/'} className="flex gap-4 items-center">
                <AiFillHome size={'30px'} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link to={'/search'} className="flex gap-4 items-center">
                <FiSearch size={'30px'} />
                <span>Search</span>
              </Link>
            </li>
            <li>
              {/*TEST */}
              <DropdownSubMenu title="Discover" parentId="LstDiscover" Icon={RiCompassDiscoverLine}>
                <ul
                  className="relative accordion-collapse collapse"
                  id="collapseLstDiscover"
                  aria-labelledby="LstDiscover"
                >
                  <li className="relative pt-2">
                    <Link
                      to="/movie"
                      className="flex items-center text-lg ml-4 overflow-hidden text-dark-smooth-text-default/60 text-ellipsis whitespace-nowrap rounded hover:bg-transparent transition duration-300 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="dark"
                    >
                      Movies
                    </Link>
                  </li>
                  <li className="relative">
                    <Link
                      to="TV"
                      className="flex items-center text-lg ml-4 overflow-hidden text-dark-smooth-text-default/60 text-ellipsis whitespace-nowrap rounded hover:bg-transparent transition duration-300 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="dark"
                    >
                      TV
                    </Link>
                  </li>
                </ul>
              </DropdownSubMenu>
            </li>

            {/*TEST */}

            {!auth ? (
              <Fragment>
                <li>
                  <Link to={'/login'} className="flex gap-4 items-center">
                    <RiLoginBoxFill size={'30px'} />
                    <span>Sign In</span>
                  </Link>
                </li>
                <li>
                  <Link to={'/signup'} className="flex gap-4 items-center">
                    <RiLoginBoxFill size={'30px'} />
                    <span>Sign Up</span>
                  </Link>
                </li>
              </Fragment>
            ) : (
              <li>
                <DropdownSubMenu title="Account" parentId="LstAccount" Icon={CgProfile}>
                  <ul
                    className="relative accordion-collapse collapse"
                    id="collapseLstAccount"
                    aria-labelledby="LstAccount"
                  >
                    <li className="relative pt-2">
                      <Link
                        to="/profile"
                        className="flex items-center text-lg ml-4 overflow-hidden text-dark-smooth-text-default/60 text-ellipsis whitespace-nowrap rounded hover:bg-transparent transition duration-300 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        Profile
                      </Link>
                    </li>
                    <li className="relative">
                      <Link
                        to="/watchlist"
                        className="flex items-center text-lg ml-4 overflow-hidden text-dark-smooth-text-default/60 text-ellipsis whitespace-nowrap rounded hover:bg-transparent transition duration-300 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        Watchlist
                      </Link>
                    </li>

                    <li className="relative">
                      <Link
                        to="/recently"
                        className="flex items-center text-lg ml-4 overflow-hidden text-dark-smooth-text-default/60 text-ellipsis whitespace-nowrap rounded hover:bg-transparent transition duration-300 ease-in-out"
                        data-mdb-ripple="true"
                        data-mdb-ripple-color="dark"
                      >
                        Recently Activities
                      </Link>
                    </li>
                    <li className="relative">
                      <button
                        onClick={handleSignOut}
                        className="flex gap-4 items-center text-lg ml-4 overflow-hidden text-red-500 text-ellipsis whitespace-nowrap rounded hover:bg-transparent transition duration-300 ease-in-out"
                      >
                        <span>Log Out</span>
                      </button>
                    </li>
                  </ul>
                </DropdownSubMenu>
              </li>
            )}
          </ul>
          <MenuList
            list={MENU_LIST}
            className={'mx-4 mt-4 pb-4 border-b-2 border-b-stone-700 text-2xl capitalize'}
            childClassName="ml-4 text-lg text-dark-smooth-text-default/60"
          />
        </div>
      </nav>
      <div
        // onClick={() => {
        //   setOpenMenu(!isOpenMenu);
        // }}
        className={`${
          isOpenMenu ? 'visible tw-background-on-blur' : 'invisible bg-transparent'
        } fixed top-16 left-0 right-0 bottom-0 -z-10 transition-all ease-linear duration-75`}
      ></div>
    </Fragment>
  );
};

export default MobileNavBar;

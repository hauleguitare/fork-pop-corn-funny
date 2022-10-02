import ListItem from '@src/components/ListItem';
import LogoText from '@src/components/LogoText';
import ProfileNavBar from '@src/components/ProfileNavBar';
import SearchBar from '@src/components/SearchBar';
import { MENU_LIST } from '@src/constants';
import { useScrollEvent } from '@src/hooks';
import { useAuth } from '@src/services/context/Auth';
import { useAppSelector } from '@src/services/Store';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

interface IDesktopHeaderProps {}

const DesktopHeader: React.FunctionComponent<IDesktopHeaderProps> = (props) => {
  const auth = useAuth();
  const displayName = useAppSelector((root) => root.userData.user?.information?.displayName);
  const photoURL = useAppSelector((root) => root.userData.user?.images?.photoURL);
  const [scrollPos] = useScrollEvent();

  return (
    <header
      className={`h-16 bg-dark-smooth-theme text-white sticky top-0 left-0 right-0 shadow-2xl z-10 duration-300 transition-colors ease-linear hover:bg-dark-smooth-surface ${
        scrollPos >= 100 ? 'bg-dark-smooth-on-surface' : 'bg-transparent'
      }`}
    >
      <ToastContainer />
      <nav className="container opacity-80 flex justify-between items-center h-full">
        <LogoText title="POPCORN" className="text-3xl" />
        <div className="flex shrink items-center">
          <ListItem
            className="flex mx-4 gap-6 capitalize cursor-pointer"
            items={MENU_LIST}
            renderItem={(item) => (
              <li key={item.id} className="group relative">
                <span>{item.name}</span>
                <ul className="absolute min-w-max top-6 right-0 bg-white group-hover:visible invisible px-4 py-2">
                  {item.dropdownMenu?.map((subItem) => (
                    <li key={subItem.id}>
                      <Link to={`${item.url || ''}${subItem.url || ''}`} className="text-black text-base">
                        {subItem.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}
          />
          <div className="flex mx-4">
            <SearchBar />
          </div>
          <div className="flex ml-4 gap-4 relative">
            {auth ? (
              <ProfileNavBar displayName={displayName} photoURL={photoURL} />
            ) : (
              <Fragment>
                <Link to={'/login'} className="bg-dark-smooth-primary/80 px-2 py-1 rounded-lg">
                  Log in
                </Link>
                <Link to={'/signup'} className="bg-blue-primary/80 t px-2 py-1 rounded-lg">
                  Sign up
                </Link>
              </Fragment>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;

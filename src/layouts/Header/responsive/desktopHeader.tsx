import ListItem from '@src/components/ListItem';
import LogoText from '@src/components/LogoText';
import SearchBar from '@src/components/SearchBar';
import { MENU_LIST } from '@src/constants';
import { useScrollEvent } from '@src/hooks';
import * as React from 'react';
import { Link } from 'react-router-dom';

interface IDesktopHeaderProps {}

const DesktopHeader: React.FunctionComponent<IDesktopHeaderProps> = (props) => {
  const [scrollPos] = useScrollEvent();

  return (
    <header
      className={`h-16 bg-dark-smooth-theme text-white sticky top-0 left-0 right-0 shadow-2xl z-10 duration-300 transition-colors ease-linear hover:bg-dark-smooth-surface ${
        scrollPos >= 100 ? 'bg-dark-smooth-on-surface' : 'bg-transparent'
      }`}
    >
      <nav className="container opacity-80 flex justify-between items-center h-full">
        <LogoText title="POPCORN" className="text-3xl" />
        <div className="flex shrink">
          <ListItem
            className="flex mr-[46px] gap-6 capitalize cursor-pointer"
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
          <div className="flex items-center gap-4">
            <SearchBar />
            <p>Login</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default DesktopHeader;

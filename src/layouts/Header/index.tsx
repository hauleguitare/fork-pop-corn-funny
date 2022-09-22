import useCurrentViewPort from '@src/hooks/useCurrentViewPort';
import React, { Fragment } from 'react';
import DesktopHeader from './responsive/desktopHeader';
import MobileHeader from './responsive/mobileHeader';
interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { width, isMobile } = useCurrentViewPort();
  return (
    <header className="h-16 bg-dark-smooth-surface text-white sticky top-0 left-0 right-0 z-10 border-b-[0.3px] border-b-stone-700">
      <Fragment>{isMobile ? <MobileHeader /> : <DesktopHeader />}</Fragment>
    </header>
  );
};

export default Header;

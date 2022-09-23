import useCurrentViewPort from '@src/hooks/useCurrentViewPort';
import React, { Fragment } from 'react';
import DesktopHeader from './responsive/desktopHeader';
import MobileHeader from './responsive/mobileHeader';
interface IHeaderProps {}

const Header: React.FunctionComponent<IHeaderProps> = (props) => {
  const { width, isMobile } = useCurrentViewPort();
  return <Fragment>{isMobile ? <MobileHeader /> : <DesktopHeader />}</Fragment>;
};

export default Header;

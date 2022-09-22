import LogoText from '@src/components/LogoText';
import React, { Fragment, useState } from 'react';
import { AiOutlineMenu } from 'react-icons/ai';
import MobileNavBar from './mobileNavBar';

interface IMobileHeaderProps {}

const MobileHeader: React.FunctionComponent<IMobileHeaderProps> = (props) => {
  const [isOpenMenu, setOpenMenu] = useState(false);
  return (
    <div className="px-4 h-full flex justify-between items-center">
      <div>
        <LogoText className="text-2xl" />
      </div>
      <button tabIndex={-1} onClick={() => setOpenMenu(!isOpenMenu)} className="w-8">
        <AiOutlineMenu
          className={`w-full h-full fill-dark-smooth-button-default hover:fill-dark-smooth-button-hover`}
        />
      </button>
      <MobileNavBar isOpenMenu={isOpenMenu} setOpenMenu={setOpenMenu} />
    </div>
  );
};

export default MobileHeader;

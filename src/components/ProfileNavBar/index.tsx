import React, { Fragment, useRef, useState } from 'react';
import GuestProfile from '@src/asserts/images/guest_profile.png';
import { SignOut } from '@src/services/Firebase/Auth/SignOut/SignOut';
import { Link } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

interface IProfileNavBarProps {
  displayName?: string | null;
  photoURL?: string | null;
}

const ProfileNavBar: React.FunctionComponent<IProfileNavBarProps> = (props) => {
  const { displayName, photoURL } = props;
  const [isClick, setClick] = useState(false);
  const [parentRef] = useAutoAnimate<HTMLDivElement>({
    duration: 150,
    easing: 'linear',
  });

  // Handle Event

  const handleOnBlur = (e: React.FocusEvent) => {
    if (!e.currentTarget?.contains(e.relatedTarget)) {
      setClick(false);
    }
    console.log('on blur');
  };
  return (
    <Fragment>
      <div
        ref={parentRef}
        onBlur={handleOnBlur}
        onClick={() => setClick(!isClick)}
        className="flex items-center gap-4 relative cursor-pointer"
      >
        <img src={photoURL ?? GuestProfile} className="max-h-10 rounded-full" />
        <p className="font-roboto text-white/80">{displayName ?? ''}</p>
        {isClick && (
          <div className="absolute right-0 min-w-max top-[110%] bg-white">
            <ul className="text-black px-2 my-2 text-base font-roboto text-start">
              <li className="py-1 px-1 hover:bg-dark-smooth-button-hover duration-150 transition-colors">
                <Link to={'/profile'}>Profile</Link>
              </li>
              <li className="py-1 px-1 hover:bg-dark-smooth-button-hover duration-150 transition-colors">
                <Link to={'/watchlist'}>Watchlist</Link>
              </li>
              <li className="px-1 py-1 hover:bg-dark-smooth-button-hover duration-150 transition-colors">
                <Link to={'/recently'}>Recently activities</Link>
              </li>
              <li
                onClick={() => {
                  SignOut();
                }}
                className="px-1 py-1 text-red-500 cursor-pointer hover:bg-red-500 hover:text-black duration-150 transition-colors"
              >
                Sign out
              </li>
            </ul>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default ProfileNavBar;

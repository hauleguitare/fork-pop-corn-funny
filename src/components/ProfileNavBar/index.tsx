import { useAutoAnimate } from '@formkit/auto-animate/react';
import GuestProfile from '@src/asserts/images/guest_profile.png';
import { SignOut } from '@src/services/Firebase/Auth/SignOut/SignOut';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

interface IProfileNavBarProps {
  displayName?: string | null;
  photoURL?: string | null;
}

// Handle Event
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
  } catch (error: any) {
    toast.update(toastId, {
      render() {
        return `sign out is fail: ${error.code}`;
      },
      type: 'error',
      autoClose: 1000,
      closeButton: true,
      isLoading: false,
    });
  }
};

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
  };
  return (
    <div
      ref={parentRef}
      onBlur={handleOnBlur}
      tabIndex={0}
      onClick={() => setClick(!isClick)}
      className="flex items-center gap-4 relative cursor-pointer"
    >
      <img
        src={photoURL ? photoURL : GuestProfile}
        className="h-10 w-10 rounded-full object-cover"
        referrerPolicy="no-referrer"
      />
      <p className="font-roboto text-white/80">{displayName ?? 'Guest'}</p>
      {isClick && (
        <div className="absolute right-0 min-w-max top-[110%] bg-white">
          <ul className="text-black px-2 my-2 text-base font-roboto text-start">
            <li className="py-1 px-1 hover:bg-dark-smooth-button-hover duration-150 transition-colors">
              <Link to={'/profile'}>
                <p>Profile</p>
              </Link>
            </li>
            <li className="py-1 px-1 hover:bg-dark-smooth-button-hover duration-150 transition-colors">
              <Link to={'/watchlist'}>
                <p>Watchlist</p>
              </Link>
            </li>
            <li className="px-1 py-1 hover:bg-dark-smooth-button-hover duration-150 transition-colors">
              <Link to={'/recently'}>
                <p>Recently activities</p>
              </Link>
            </li>
            <li
              onClick={handleSignOut}
              className="px-1 py-1 text-red-500 cursor-pointer hover:bg-red-500 hover:text-black duration-150 transition-colors"
            >
              Sign out
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileNavBar;

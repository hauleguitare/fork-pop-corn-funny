import * as React from 'react';
import { AiOutlineSend } from 'react-icons/ai';
import { FiSend } from 'react-icons/fi';
import GuestProfile from '@src/asserts/images/guest_profile.png';
import { useAuth } from '@src/services/context/Auth';
import { useAppSelector } from '@src/services/Store';

interface IInputCommentProps {
  onSubmit: (value: string) => void;
}

const InputComment: React.FunctionComponent<IInputCommentProps> = (props) => {
  const { onSubmit } = props;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const userData = useAppSelector((root) => root.userData.user);
  if (!userData) {
    return null;
  }

  // Handle Event
  const handleOnSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputRef.current) {
      onSubmit(inputRef.current.value.trim());
      inputRef.current.value = '';
    }
  };
  return (
    <form
      onSubmit={handleOnSubmit}
      className="w-full flex items-center up-mobile:relative fixed bottom-0 right-0 left-0 up-mobile:py-2 up-mobile:z-0 z-50 py-4 up-mobile:bg-transparent bg-dark-smooth-theme"
    >
      <img
        src={userData.images.photoURL ? userData.images.photoURL : GuestProfile}
        alt=""
        className=" object-cover w-10 h-10 rounded-full"
      />
      <input
        autoFocus
        ref={inputRef}
        className="w-full mx-2 py-2 px-4 outline-none text-white/80 bg-dark-smooth-on-surface rounded-lg"
        placeholder="Write your comment..."
      />
      <button type="submit">
        <AiOutlineSend
          size={'28px'}
          className="fill-dark-smooth-button-default hover:fill-dark-smooth-button-hover duration-150 transition-all ease-in"
        />
      </button>
    </form>
  );
};

export default InputComment;

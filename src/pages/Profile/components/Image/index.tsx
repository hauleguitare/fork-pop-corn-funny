import { useAppSelector } from '@src/services/Store';
import * as React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import ProfileAvatar from './Avatar';
import ProfileBanner from './Banner';

interface IProfileImageProps {}

const ProfileImage: React.FunctionComponent<IProfileImageProps> = (props) => {
  const uid = useAppSelector((root) => root.userData.user?.uid);
  //handle Event
  const handleOnError = (error: any) => {
    if (error) {
      toast.error(`${error}`, {
        autoClose: 2000,
        type: 'error',
        closeButton: true,
      });
    } else {
      toast.success('success update images', {
        autoClose: 2000,
        type: 'success',
        closeButton: true,
      });
    }
  };

  return (
    <div className="relative">
      <ProfileBanner access uid={uid} onError={handleOnError} />
      <ProfileAvatar access uid={uid} onError={handleOnError} />
    </div>
  );
};

export default ProfileImage;

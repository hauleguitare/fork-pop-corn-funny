import { useAppSelector } from '@src/services/Store';
import * as React from 'react';
import { toast } from 'react-toastify';
import ProfileAvatar from './Avatar';
import ProfileBanner from './Banner';

interface IProfileImageProps {}

const ProfileImage: React.FunctionComponent<IProfileImageProps> = (props) => {
  const uid = useAppSelector((root) => root.userData.user?.uid);
  const displayName = useAppSelector((root) => root.userData.user?.information.displayName);
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
    <React.Fragment>
      <div className="relative">
        <ProfileBanner access uid={uid} onError={handleOnError} />
        <ProfileAvatar access uid={uid} onError={handleOnError} />
        <div className="mt-16 up-mobile:ml-4 ml-2 text-white/80 text-lg font-roboto">
          <span>{displayName ?? 'No name'}</span>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProfileImage;

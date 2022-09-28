import * as React from 'react';
import ProfileAvatar from './Avatar';
import ProfileBanner from './Banner';

interface IProfileImageProps {}

const ProfileImage: React.FunctionComponent<IProfileImageProps> = (props) => {
  return (
    <div className="relative">
      <ProfileBanner access />
      <ProfileAvatar />
    </div>
  );
};

export default ProfileImage;

import * as React from 'react';

interface IProfileAvatarProps {}

const ProfileAvatar: React.FunctionComponent<IProfileAvatarProps> = (props) => {
  return (
    <div className="rounded-full inline-block overflow-hidden absolute -translate-y-1/2 left-2 border-2 border-dark-smooth-on-surface">
      <img
        src="https://lh3.googleusercontent.com/a-/ACNPEu_6vuI0NNCnp0-mUFz-FSoQKUGVakxeBAseu_hSGg=s96-c"
        alt=""
        referrerPolicy="no-referrer"
        className="w-24 h-24 object-cover"
      />
    </div>
  );
};

export default ProfileAvatar;

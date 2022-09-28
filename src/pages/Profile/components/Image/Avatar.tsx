import { uploadImage } from '@src/api/uploadImage';
import { useUserData } from '@src/services/context/UserData';
import { updateFieldDocument } from '@src/services/Firebase/Collection/updateDocument';
import * as React from 'react';
import GuestProfile from '@src/asserts/images/guest_profile.png';

interface IProfileAvatarProps {
  access?: boolean;
}

const ProfileAvatar: React.FunctionComponent<IProfileAvatarProps> = (props) => {
  const { access } = props;
  const [isLoadingUpdate, setLoadingUpdate] = React.useState(false);
  const userData = useUserData();
  if (!userData) return null;

  // Handle Event

  const handleOnChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempListData = e.currentTarget.files;
    if (!tempListData) {
      return;
    }
    const formData = new FormData();
    formData.append('image', tempListData[0]);
    try {
      setLoadingUpdate(true);
      const res = await uploadImage(formData);
      console.log(res.status);
      updateFieldDocument(userData.uid, 'users', 'photoURL', res.data.link).catch((error) => {
        console.log("can't not update image: ", error);
      });
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className="w-24 h-24 font-roboto rounded-full inline-block overflow-hidden absolute -translate-y-1/2 left-2 border-2 border-dark-smooth-on-surface group">
      <img
        src={userData.photoURL ? userData.photoURL : GuestProfile}
        alt=""
        referrerPolicy="no-referrer"
        className="object-cover w-full h-full"
      />
      <input onChange={handleOnChangeImage} type={'file'} id={'upload-avatar'} accept={'image/*'} className="hidden" />
      <label
        htmlFor="upload-avatar"
        className="flex flex-col items-center justify-center cursor-pointer absolute bottom-0 top-full bg-dark-smooth-on-surface/80 w-full h-full rounded-full group-hover:-translate-y-[100%] ease-in transition-transform duration-150"
      >
        <span>Upload</span>
      </label>
    </div>
  );
};

ProfileAvatar.defaultProps = {
  access: false,
};

export default ProfileAvatar;

import { uploadImage } from '@src/api/uploadImage';
import GuestProfile from '@src/asserts/images/guest_profile.png';
import { useUserData } from '@src/services/context/UserData';
import { updateFieldDocument, updateUserFieldImages } from '@src/services/Firebase/Collection/updateDocument';
import { RootState } from '@src/services/Store';
import * as React from 'react';
import { FaSpinner } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { toast, ToastContainer } from 'react-toastify';

interface IProfileAvatarProps {
  access?: boolean;
  uid?: string;
  onError: (error: any) => void;
}

const ProfileAvatar: React.FunctionComponent<IProfileAvatarProps> = (props) => {
  const image = useSelector((root: RootState) => root.userData.user?.images.photoURL);
  const { access, uid, onError } = props;
  const [isLoadingUpdate, setLoadingUpdate] = React.useState(false);

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
      await updateUserFieldImages(uid ?? '', 'photoURL', res.data.link);
      onError(null);
    } catch (error) {
      onError(error);
    } finally {
      setLoadingUpdate(false);
    }
  };

  return (
    <div className="w-24 h-24 font-roboto rounded-full inline-block overflow-hidden absolute -translate-y-1/2 left-2 border-2 border-dark-smooth-on-surface group">
      <img
        src={image ? image : GuestProfile}
        alt=""
        referrerPolicy="no-referrer"
        className="object-cover w-full h-full"
      />

      {access && (
        <React.Fragment>
          <input
            onChange={handleOnChangeImage}
            type={'file'}
            id={'upload-avatar'}
            accept={'image/*'}
            className="hidden"
          />
          <label
            htmlFor="upload-avatar"
            className="flex flex-col items-center justify-center cursor-pointer absolute bottom-0 top-full bg-dark-smooth-on-surface/80 w-full h-full rounded-full group-hover:-translate-y-[100%] ease-in transition-transform duration-150"
          >
            <span>Upload</span>
          </label>
          {isLoadingUpdate && (
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-8 h-8">
              <FaSpinner className="animate-spin w-full h-full" color="#78716c" />
            </div>
          )}
        </React.Fragment>
      )}
    </div>
  );
};

ProfileAvatar.defaultProps = {
  access: false,
};

export default ProfileAvatar;

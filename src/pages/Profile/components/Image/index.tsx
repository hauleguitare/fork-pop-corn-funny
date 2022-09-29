import { uploadImage } from '@src/api/uploadImage';
import { updateFieldDocument } from '@src/services/Firebase/Collection/updateDocument';
import { RootState } from '@src/services/Store';
import * as React from 'react';
import { useSelector } from 'react-redux';
import ProfileAvatar from './Avatar';
import ProfileBanner from './Banner';

interface IProfileImageProps {
  uid?: string;
}

const ProfileImage: React.FunctionComponent<IProfileImageProps> = (props) => {
  const { uid } = props;
  const images = useSelector((root: RootState) => root.userData.images);

  // handle Event

  const handleOnChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const tempListData = e.currentTarget.files;
    if (!tempListData) {
      return;
    }
    const formData = new FormData();
    formData.append('image', tempListData[0]);
    try {
      const res = await uploadImage(formData);
      updateFieldDocument(uid ?? '', 'users', 'images', res.data.link).catch((error) => {
        console.log("can't not update image: ", error);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="relative">
      <ProfileBanner access uid={uid} url={images?.bannerURL} onChangeImage={handleOnChangeImage} />
      <ProfileAvatar access url={images?.photoURL} uid={uid} onChangeImage={handleOnChangeImage} />
    </div>
  );
};

export default ProfileImage;

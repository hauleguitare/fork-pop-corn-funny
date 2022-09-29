import { uploadImage } from '@src/api/uploadImage';
import { useUserData } from '@src/services/context/UserData';
import { updateFieldDocument } from '@src/services/Firebase/Collection/updateDocument';
import { RootState } from '@src/services/Store';
import React, { Fragment, useState } from 'react';
import { BsImages } from 'react-icons/bs';
import { FaSpinner } from 'react-icons/fa';
import { useSelector } from 'react-redux';

interface IProfileBannerProps {
  access?: boolean;
  url?: string;
  uid?: string;
  onChangeImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ProfileBanner: React.FunctionComponent<IProfileBannerProps> = (props) => {
  const { access, url, uid, onChangeImage } = props;
  const [isLoadingUpdate, setLoadingUpdate] = useState(false);

  // Handle Event
  // const handleOnChangeImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const tempListData = e.currentTarget.files;
  //   if (!tempListData) {
  //     return;
  //   }
  //   const formData = new FormData();
  //   formData.append('image', tempListData[0]);
  //   try {
  //     setLoadingUpdate(true);
  //     const res = await uploadImage(formData);
  //     updateFieldDocument(uid ?? '', 'users', 'images', res.data.link).catch((error) => {
  //       console.log("can't not update image: ", error);
  //     });
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     setLoadingUpdate(false);
  //   }
  // };

  return (
    <div className="relative">
      <img
        className="h-[175px] up-mobile:h-full max-h-[400px] min-w-full object-cover"
        src={
          url
            ? url
            : 'https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/cebd17f1-b283-45e5-8600-6ec3edc558fd/dee2aqv-222532a7-8676-4788-b8e3-08d4f5be55e2.png/v1/fill/w_1280,h_640,q_80,strp/profile_banner_by_darkfigure4_dee2aqv-fullview.jpg?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NjQwIiwicGF0aCI6IlwvZlwvY2ViZDE3ZjEtYjI4My00NWU1LTg2MDAtNmVjM2VkYzU1OGZkXC9kZWUyYXF2LTIyMjUzMmE3LTg2NzYtNDc4OC1iOGUzLTA4ZDRmNWJlNTVlMi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.sdy7FtZ92V4tHXX-hTf0PupZmkD7CQoG-BkmOY0_mQg'
        }
        alt="banner"
      />
      {access && (
        <Fragment>
          {isLoadingUpdate && (
            <div className="absolute -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-8 h-8">
              <FaSpinner className="animate-spin w-full h-full" color="#78716c" />
            </div>
          )}
          <label
            htmlFor="upload-banner"
            className="absolute bottom-0 right-0 opacity-60 mx-2 my-2 flex items-center bg-dark-smooth-button-default px-2 py-1 rounded-full gap-2"
          >
            <p>Upload image</p>
            <BsImages />
          </label>
          <input onChange={onChangeImage} id="upload-banner" type={'file'} accept="image/*" className="hidden" />
        </Fragment>
      )}
    </div>
  );
};

ProfileBanner.defaultProps = {
  access: false,
};
export default ProfileBanner;

/*
 const res = axios({
        method: 'POST',
        url: 'https://api.imgur.com/3/image',
        data: formData,
        headers: {
          Authorization: auth,
          'Content-Type': 'multipart/form-data',
        },
      });
      res.then((val) => {
        const data: IResponseImgur = val.data;
        console.log(data.data);
      });



      try {
        setLoadingUpdate(true);
        const url = await UploadImagesToStorage(tempListData[0], 'banner', 'hauletrung');
        setImageURL(url);
      } catch (error) {
        console.log(error);
      } finally {
        setLoadingUpdate(false);
      }

*/

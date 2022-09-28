import * as React from 'react';
import ProfileImage from './components/Image';
import PublicField from './components/PublicField';
import PublicTextArea from './components/PublicTextArea';
import SecretField from './components/SecretField';

interface IProfilePageProps {}

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  return (
    <div className="text-white">
      {/* <p>My account</p> */}
      <ProfileImage />
      <div className="mt-16 ml-2 text-white text-lg font-roboto">
        <span>Hau Le Trung</span>
      </div>
      {/* This setting I will try to separate from the component that can only be accessed when that person is the owner of this user */}
      <div className="mt-4">
        <span className="ml-2 text-xl font-roboto text-dark-smooth-text-default">Setting Profile</span>
        <PublicField accessEdit label="Email" type={'text'} initialValue="alexander.dutyone@gmail.com" />
        <PublicField accessEdit label="Display Name" type={'text'} initialValue="Hau Le Trung" />
        <SecretField access label="Password" type={'password'} initialValue="Haule2801@" />
        <PublicTextArea accessEdit label="About me" initialValue="Hello i am Hau Le Trung" />
      </div>
    </div>
  );
};

export default ProfilePage;

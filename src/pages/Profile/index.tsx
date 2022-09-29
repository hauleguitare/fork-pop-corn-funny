import { useAuth } from '@src/services/context/Auth';
import { RootState } from '@src/services/Store';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ButtonField from './components/ButtonField';
import FormUpdate, { IDataSubmit } from './components/FormUpdate';
import ProfileImage from './components/Image';

interface IProfilePageProps {}

const initialValues = {
  email: '',
  description: '',
  displayName: '',
};

const ProfilePage: React.FunctionComponent<IProfilePageProps> = (props) => {
  const userInfomation = useSelector((root: RootState) => root.userData.infomation);
  const userId = useSelector((root: RootState) => root.userData.uid);
  const auth = useAuth();
  const [access, setAccess] = React.useState(true);
  const [providerAccess, setProviderAccess] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<typeof initialValues | null>(null);
  React.useEffect(() => {
    if (userInfomation) {
      const value = {
        email: userInfomation.email,
        description: userInfomation.description,
        displayName: userInfomation.displayName,
      };
      setCurrentUser(value);
    }
  }, [userInfomation]);

  // Function Toasty message

  const handleOnValidationSubmit = async (dataSubmit: IDataSubmit) => {
    // if (!auth) {
    //   return;
    // }
    // const test = updateProfile(auth, dataSubmit);
    // console.log('status: ', test);
    // const response = await toast.promise(updateProfile(auth, dataSubmit), {
    //   pending: {
    //     render() {
    //       return 'please wait for seconds';
    //     },
    //   },
    //   success: {
    //     render() {
    //       return 'update success !';
    //     },
    //     icon: '🟢',
    //   },
    //   error: {
    //     render() {
    //       return 'fail to update, please try again';
    //     },
    //     icon: '🔴',
    //   },
    // });
  };

  return (
    <div className="text-white">
      <ToastContainer autoClose={2000} />
      {/* <p>My account</p> */}
      <ProfileImage uid={userId ?? ''} />
      <div className="mt-16 ml-2 text-white text-lg font-roboto">
        <span>Hau Le Trung</span>
      </div>
      {/* This setting I will try to separate from the component that can only be accessed when that person is the owner of this user */}
      <div className="mt-4 up-mobile:flex-row up-mobile:flex up-mobile:gap-4 up-mobile:justify-center container font-roboto">
        <div className="flex-grow up-mobile:max-w-[600px]">
          <span className="ml-2 text-xl font-roboto text-dark-smooth-text-default">Setting Profile</span>
          <FormUpdate
            onvalidationSubmit={handleOnValidationSubmit}
            providerAccess={true}
            access={access}
            valueDefault={currentUser ?? initialValues}
          />
        </div>
        {access && (
          <div className="up-mobile:border-l-[1px] up-mobile:border-white/40 up-mobile:pl-2">
            <span className="ml-2 text-xl font-roboto text-dark-smooth-text-default">Advance</span>
            <div className="h-full up-mobile:flex up-mobile:flex-col py-4">
              <ButtonField
                title="Your mail is"
                color="#15803D"
                onClick={(e) => console.log(e)}
                hightlight="verified"
                titleButton="send verified email"
                classNameButton="underline text-blue-primary"
                className="text-xl"
              />
              <ButtonField
                title="If you want"
                color="#B91C1C"
                onClick={(e) => console.log(e)}
                hightlight="delete account"
                titleButton="delete"
                className="text-xl"
                classNameButton="text-red-500"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;

// const updateStatus = updateFieldUserDocumentWithObject(auth.uid, 'users', dataSubmit);
// toast.promise(updateStatus, {
//   pending: {
//     render(){
//       return 'please wait for seconds';
//     }
//   },
//   success: {
//     render(){
//       return 'update success !';
//     },
//     icon: '🟢'
//   },
//   error: {
//     render(){
//       return 'fail to update, please try again';
//     },
//     icon: '🔴'
//   }
// });

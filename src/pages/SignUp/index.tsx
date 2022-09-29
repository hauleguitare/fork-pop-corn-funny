import LogoText from '@src/components/LogoText';
import MotionChangePage from '@src/components/MotionChangePage';
import { useAuth } from '@src/services/context/Auth';
import { SignInWithProvider } from '@src/services/Firebase/Auth/SignIn/SignInWithProvider';
import { SignUpUserWithEmailAndPassWord } from '@src/services/Firebase/Auth/SignUp/SignUpUserWithEmailAndPassword';
import { createUserDocument } from '@src/services/Firebase/Collection/createCollection';
import { sendEmailVerification, updateProfile } from 'firebase/auth';
import * as React from 'react';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormRegister, { IDataSubmit } from './components/Form/Register';

interface ISignUpPageProps {}

const SignUpPage: React.FunctionComponent<ISignUpPageProps> = (props) => {
  /* Handle On Register */
  const handleOnSubmit = async (dataSubmit: IDataSubmit) => {
    const displayName = dataSubmit.firstname + ' ' + dataSubmit.lastname;
    const id = toast.loading('Please wait');
    try {
      const credential = await SignUpUserWithEmailAndPassWord(displayName, dataSubmit.email, dataSubmit.password);
      sendEmailVerification(credential.user);
      updateProfile(credential.user, { displayName: displayName });
      createUserDocument(credential.user);
      toast.update(id, {
        render() {
          return 'Sign up success, please enjoy.';
        },
        type: 'success',
        isLoading: false,
      });
    } catch (error) {
      toast.update(id, {
        render() {
          return `Error: ${error}`;
        },
        type: 'error',
        isLoading: false,
      });
    }
  };

  return (
    <React.Fragment>
      <MotionChangePage>
        <div className="w-full text-white container min-h-screen">
          <ToastContainer />
          <div className="mt-8 max-w-xl w-full px-4 py-2 relative up-mobile:absolute min-h-[500px] up-mobile:top-1/2 up-mobile:left-1/2 up-mobile:-translate-y-1/2 up-mobile:-translate-x-1/2">
            <div className="flex flex-col items-center pb-8">
              <LogoText className="text-5xl up-mobile:text-6xl" />
              <span className="text-xl font-roboto text-dark-smooth-text-default/70">Let's enjoy the best movies!</span>
            </div>
            <FormRegister onValidationSubmit={handleOnSubmit} />

            <div className="flex justify-center mt-2">
              <span>
                Already account, login{' '}
                <Link to="/login" className="italic text-blue-primary underline">
                  here
                </Link>
              </span>
            </div>
            <span className="flex justify-center mt-4 text-dark-smooth-text-default text-lg">Or sign up using</span>
            <div className="w-full flex justify-center items-center">
              <button
                onClick={() => SignInWithProvider('facebook')}
                className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface"
              >
                <BsFacebook className="w-10 h-10 fill-white hover:fill-blue-600 duration-150 transition-colors ease-in" />
              </button>
              <button
                onClick={() => SignInWithProvider('google')}
                className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface"
              >
                <BsGoogle className="w-10 h-10 fill-white hover:fill-red-600 duration-150 transition-colors ease-in" />
              </button>
            </div>
          </div>
        </div>
      </MotionChangePage>
    </React.Fragment>
  );
};

export default SignUpPage;

/*
<React.Fragment>
      {currentUser ? (
        <Navigate to={'/'}></Navigate>
      ) : (
        <MotionChangePage>
          <div className="w-full text-white container min-h-screen">
            <ToastContainer />
            <div className="mt-8 max-w-xl w-full px-4 py-2 relative up-mobile:absolute min-h-[500px] up-mobile:top-1/2 up-mobile:left-1/2 up-mobile:-translate-y-1/2 up-mobile:-translate-x-1/2">
              <div className="flex flex-col items-center pb-8">
                <LogoText className="text-5xl up-mobile:text-6xl" />
                <span className="text-xl font-roboto text-dark-smooth-text-default/70">
                  Let's enjoy the best movies!
                </span>
              </div>
              <FormRegister onValidationSubmit={handleOnSubmit} />

              <div className="flex justify-center mt-2">
                <span>
                  Already account, login{' '}
                  <Link to="/login" className="italic text-blue-primary underline">
                    here
                  </Link>
                </span>
              </div>
              <span className="flex justify-center mt-4 text-dark-smooth-text-default text-lg">Or sign up using</span>
              <div className="w-full flex justify-center items-center">
                <button
                  onClick={() => SignInWithProvider('facebook')}
                  className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface"
                >
                  <BsFacebook className="w-10 h-10 fill-white hover:fill-blue-600 duration-150 transition-colors ease-in" />
                </button>
                <button
                  onClick={() => SignInWithProvider('google')}
                  className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface"
                >
                  <BsGoogle className="w-10 h-10 fill-white hover:fill-red-600 duration-150 transition-colors ease-in" />
                </button>
              </div>
            </div>
          </div>
        </MotionChangePage>
      )}
    </React.Fragment>

*/

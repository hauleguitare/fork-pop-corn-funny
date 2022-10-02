import LogoText from '@src/components/LogoText';
import MotionChangePage from '@src/components/MotionChangePage';
import FormLogin, { IDataSubmit } from '@src/pages/SignIn/components/Form/Login';
import { SignInUserWithEmailAndPassWord } from '@src/services/Firebase/Auth/SignIn/SignInUserWithEmailAndPassWord';
import { SignInWithProvider } from '@src/services/Firebase/Auth/SignIn/SignInWithProvider';
import { ConvertCodeErrorFirebase } from '@src/utils/ConvertCodeErrorFirebase';
import * as React from 'react';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface ISignInPageProps {}

const SignInPage: React.FunctionComponent<ISignInPageProps> = (props) => {
  const handleOnSubmit = async (dataSubmit: IDataSubmit) => {
    const Toastid = toast.loading('wait for second');
    try {
      // I don't have idea to use credential but future may be using. Note !!!
      await SignInUserWithEmailAndPassWord(dataSubmit.email, dataSubmit.password);
      toast.update(Toastid, {
        render() {
          return 'Login success';
        },
        type: 'success',
        closeButton: true,
        autoClose: 2000,
        isLoading: false,
      });
    } catch (error: any) {
      toast.update(Toastid, {
        render() {
          return `Login fail: ${error.code}`;
        },
        closeButton: true,
        type: 'error',
        autoClose: 2000,
        isLoading: false,
      });
    }
  };

  return (
    <MotionChangePage>
      <div className="w-full text-white container min-h-screen">
        <ToastContainer autoClose={2000} />
        <div className="mt-8 max-w-xl w-full px-4 py-2 relative up-mobile:absolute min-h-[500px] up-mobile:top-1/2 up-mobile:left-1/2 up-mobile:-translate-y-1/2 up-mobile:-translate-x-1/2">
          <div className="flex flex-col items-center pb-8">
            <LogoText className="text-5xl up-mobile:text-6xl" />
            <span className="text-xl font-roboto text-dark-smooth-text-default/70">Let's enjoy the best movies!</span>
          </div>

          {/* <FormLogin /> */}
          <FormLogin onValidationSubmit={handleOnSubmit} />
          <div className="flex justify-center mt-2">
            <span>
              Not member account, sign up{' '}
              <Link to="/signup" className="italic text-blue-primary underline">
                here
              </Link>
            </span>
          </div>
          <span className="flex justify-center mt-4 text-dark-smooth-text-default text-lg">Or sign in using</span>
          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => {
                SignInWithProvider('facebook');
              }}
              className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface"
            >
              <BsFacebook className="w-10 h-10 fill-white hover:fill-blue-600 duration-150 transition-colors ease-in" />
            </button>

            <button
              onClick={() => {
                SignInWithProvider('google');
              }}
              className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface"
            >
              <BsGoogle className="w-10 h-10 fill-white hover:fill-red-600 duration-150 transition-colors ease-in" />
            </button>
          </div>
        </div>
      </div>
    </MotionChangePage>
  );
};

export default SignInPage;

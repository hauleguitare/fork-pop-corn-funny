import LogoText from '@src/components/LogoText';
import MotionChangePage from '@src/components/MotionChangePage';
import FormLogin, { IDataSubmit } from '@src/pages/Login/components/Form/Login';
import { SignInUserWithEmailAndPassWord } from '@src/services/Firebase/Auth/SignIn/SignInUserWithEmailAndPassWord';
import { SignInWithFacebook, SignInWithGoogle } from '@src/services/Firebase/Auth/SignIn/SignInWithProvider';
import * as React from 'react';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

interface ILoginPageProps {}

const LoginPage: React.FunctionComponent<ILoginPageProps> = (props) => {
  const handleOnSubmit = async (dataSubmit: IDataSubmit) => {
    SignInUserWithEmailAndPassWord(dataSubmit.email, dataSubmit.password)
      .then((res) => {
        console.log('response signin: ', res);
      })
      .catch((error) => {
        console.log("can't not sign in with gmail and password, please try again", error);
      });
  };

  return (
    <MotionChangePage>
      <div className="w-full text-white container min-h-screen">
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
                SignInWithFacebook();
              }}
              className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface"
            >
              <BsFacebook className="w-10 h-10 fill-white hover:fill-blue-600 duration-150 transition-colors ease-in" />
            </button>

            <button
              onClick={() => {
                SignInWithGoogle();
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

export default LoginPage;

{
  /* <div className="relative flex items-center bg-dark-smooth-on-surface py-4 mb-8 shadow-lg rounded-md">
            <label title="Email" />
            <input type={'text'} className="pl-8 pr-4 text-xl w-full outline-none bg-transparent" placeholder="Email" />
          </div>
          <div className="relative flex items-center bg-dark-smooth-on-surface py-4 shadow-lg rounded-md">
            <input
              type={'password'}
              className="pl-8 pr-4 text-xl w-full outline-none bg-transparent"
              placeholder="Password"
            />
          </div> */
}

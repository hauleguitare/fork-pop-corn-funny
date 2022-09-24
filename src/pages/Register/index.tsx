import LogoText from '@src/components/LogoText';
import * as React from 'react';

interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  return (
    <main className="w-full text-white container min-h-screen">
      <div className="mt-8 max-w-xl w-full px-4 py-2 absolute min-h-[500px] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">
        <div className="flex flex-col items-center pb-8">
          <LogoText className="text-5xl up-mobile:text-6xl" />
          <span className="text-xl font-roboto text-dark-smooth-text-default/70">Let's enjoy the best movies!</span>
        </div>
        <form className="text-white/80 relative bg-dark-smooth-surface rounded-lg overflow-hidden w-full py-4 px-2">
          <div className="relative flex items-center bg-dark-smooth-on-surface py-4 mb-8 shadow-lg rounded-md">
            <input type={'text'} className="pl-8 pr-4 text-xl w-full outline-none bg-transparent" placeholder="Email" />
          </div>
          <div className="relative flex items-center bg-dark-smooth-on-surface py-4 shadow-lg rounded-md">
            <input
              type={'password'}
              className="pl-8 pr-4 text-xl w-full outline-none bg-transparent"
              placeholder="Password"
            />
          </div>
          <a href="#" className="flex justify-end pt-2 italic">
            Forgot password?
          </a>
          <button className="text-dark-smooth-text-primary text-lg font-roboto flex justify-center w-full mt-8 mb-2 py-2 px-2 bg-gradient-to-bl to-dark-smooth-primary/60 via-dark-smooth-primary/75 from-dark-smooth-primary rounded-lg">
            Login
          </button>
        </form>
        {/* <span className="flex justify-center mt-4 text-dark-smooth-text-default text-lg">Or sign up using</span> */}
        {/* <div className="w-full flex justify-center items-center">
          <div className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface">
            <BsFacebook className="w-10 h-10 fill-white hover:fill-blue-600 duration-150 transition-colors ease-in" />
          </div>
          <div className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface">
            <BsGoogle className="w-10 h-10 fill-white hover:fill-red-600 duration-150 transition-colors ease-in" />
          </div>
        </div> */}
      </div>
    </main>
  );
};

export default RegisterPage;

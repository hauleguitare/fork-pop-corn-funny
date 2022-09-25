import LogoText from '@src/components/LogoText';
import * as React from 'react';
import { BsFacebook, BsGoogle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import FormRegister from './components/Form/Register';

interface IRegisterPageProps {}

const RegisterPage: React.FunctionComponent<IRegisterPageProps> = (props) => {
  return (
    <main className="w-full text-white container min-h-screen">
      <div className="mt-8 max-w-xl w-full px-4 py-2 relative up-mobile:absolute min-h-[500px] up-mobile:top-1/2 up-mobile:left-1/2 up-mobile:-translate-y-1/2 up-mobile:-translate-x-1/2">
        <div className="flex flex-col items-center pb-8">
          <LogoText className="text-5xl up-mobile:text-6xl" />
          <span className="text-xl font-roboto text-dark-smooth-text-default/70">Let's enjoy the best movies!</span>
        </div>
        <FormRegister />

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
          <div className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface">
            <BsFacebook className="w-10 h-10 fill-white hover:fill-blue-600 duration-150 transition-colors ease-in" />
          </div>
          <div className="mx-2 my-2 px-2 py-2 rounded-full bg-dark-smooth-on-surface">
            <BsGoogle className="w-10 h-10 fill-white hover:fill-red-600 duration-150 transition-colors ease-in" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterPage;

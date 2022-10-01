import { useAuth } from '@src/services/context/Auth';
import { useAppDispatch, useAppSelector } from '@src/services/Store';
import { setStatusShowDialog, updateAuthenticateUser } from '@src/services/Store/slices/reAuthenticate';
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { AnimatePresence } from 'framer-motion';
import * as React from 'react';
import ModalTemplete from '../ModalTemplete';
import { motion } from 'framer-motion';

interface IReAuthenticateFieldProps {
  onError: (error: any) => void;
}

const ReAuthenticateField: React.FunctionComponent<IReAuthenticateFieldProps> = (props) => {
  const { onError } = props;
  const auth = useAuth();
  const dispatch = useAppDispatch();
  const isShowReAuthenticate = useAppSelector((root) => root.reAuthenticate.isShowDialog);
  const passwordRef = React.useRef<HTMLInputElement>(null);

  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      dispatch(setStatusShowDialog(false));
    }
  };

  const handlePromptSubmitPassword = async (password: string) => {
    try {
      if (!auth) {
        return;
      }
      if (password.length === 0) {
        throw new Error('Oops ! you have not entered your password');
      }
      const credentialUser = EmailAuthProvider.credential(auth?.email as string, password.trim());
      const currentUser = await reauthenticateWithCredential(auth, credentialUser);
      dispatch(updateAuthenticateUser(currentUser));
      dispatch(setStatusShowDialog(false));
      onError(null);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <AnimatePresence>
      {isShowReAuthenticate && (
        <ModalTemplete>
          <motion.form
            initial={{
              opacity: 0,
              scale: 0,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              scale: 0,
            }}
            transition={{
              duration: 0.33,
              delay: 0.1,
            }}
            onSubmit={(e) => {
              if (passwordRef.current) {
                e.preventDefault();
                handlePromptSubmitPassword(passwordRef.current.value);
              }
            }}
          >
            <div
              tabIndex={0}
              onBlur={handleOnBlur}
              className="min-w-max up-mobile:min-w-[500px] bg-dark-smooth-surface flex flex-col justify-center py-4 px-4 rounded-lg shadow-lg font-roboto"
            >
              <label className="pb-4 text-center up-mobile:text-lg text-base">
                Please enter your Authentication password
              </label>
              <input
                ref={passwordRef}
                type={'password'}
                autoFocus={true}
                placeholder={'Your password'}
                className="h-8 bg-dark-smooth-on-surface rounded-lg outline-none px-4 text-base"
              />
              <button
                type="submit"
                className="mt-4 py-2 px-2 bg-dark-smooth-button-default rounded-full hover:bg-dark-smooth-button-hover duration-100 ease-linear transition-colors"
              >
                Submit
              </button>
            </div>
          </motion.form>
        </ModalTemplete>
      )}
    </AnimatePresence>
  );
};

export default ReAuthenticateField;

/*
<React.Fragment>
      {isShowReAuthenticate && (
        <Dialog>
          <form
            onSubmit={(e) => {
              if (passwordRef.current) {
                e.preventDefault();
                handlePromptSubmitPassword(passwordRef.current.value);
              }
            }}
          >
            <div
              tabIndex={0}
              onBlur={handleOnBlur}
              className="min-w-[500px] bg-dark-smooth-surface flex flex-col justify-center py-4 px-4 rounded-lg shadow-lg"
            >
              <label className="pb-2 text-center">Please enter your authentication password</label>
              <input
                ref={passwordRef}
                type={'password'}
                autoFocus={true}
                placeholder={'please input password to authentication'}
                className="h-8 bg-dark-smooth-on-surface rounded-lg outline-none px-4"
              />
              <button type="submit" className="mt-4 py-2 px-2 bg-dark-smooth-button-default rounded-full">
                Submit
              </button>
            </div>
          </form>
        </Dialog>
      )}
    </React.Fragment>


*/

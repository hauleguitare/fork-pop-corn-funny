import ModalTemplete from '@src/components/ModalTemplete';
import { DeleteAccount } from '@src/services/Firebase/Auth/DeleteAccount';
import { useAppDispatch, useAppSelector } from '@src/services/Store';
import { requireAuthenticateUser } from '@src/services/Store/slices/reAuthenticate';
import { sendEmailVerification, User } from 'firebase/auth';
import { AnimatePresence, motion } from 'framer-motion';
import * as React from 'react';
import { toast } from 'react-toastify';
import ButtonField from './Form/ButtonField';

interface IAdvanceSettingProps {
  auth: User | null;
}

const AdvanceSetting: React.FunctionComponent<IAdvanceSettingProps> = (props) => {
  const { auth } = props;
  const isVerify = auth?.emailVerified;
  const promtAuthenticate = useAppSelector((root) => root.reAuthenticate.promtAuthenticateUser);
  const dispatch = useAppDispatch();
  const [isDeleteAccount, setDeleteAccount] = React.useState(false);
  const [confirmDeleteAccount, setConfirmDeleteAccount] = React.useState(false);

  // handle Event
  const handleOnSendEmail = async (e: React.MouseEvent) => {
    if (!auth) {
      return;
    }
    e.preventDefault();
    toast.promise(sendEmailVerification(auth), {
      pending: {
        render() {
          return 'wait to send mail verification';
        },
      },
      success: {
        render() {
          return 'please check mail spam to verification';
        },
      },
      error: {
        render() {
          return 'error to send mail verification, please try again';
        },
      },
    });
  };

  const handleToDeleteEmail = async (e: React.MouseEvent) => {
    if (!auth) {
      return;
    }
    if (promtAuthenticate) {
      dispatch(requireAuthenticateUser());
    } else {
      setDeleteAccount(true);
      if (confirmDeleteAccount) {
        toast.promise(DeleteAccount(auth), {
          pending: {
            render() {
              return 'wait to delete account';
            },
          },
          success: {
            render() {
              return 'delete account success, you will log out now';
            },
          },
          error: {
            render() {
              return `error to delete account`;
            },
          },
        });
      }
    }
  };

  const handleOnBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setDeleteAccount(false);
    }
  };

  return (
    <React.Fragment>
      <AnimatePresence>
        {isDeleteAccount && (
          <ModalTemplete>
            <motion.div
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
            >
              <div
                tabIndex={0}
                onBlur={handleOnBlur}
                className="min-w-[300px] up-mobile:min-w-[500px] bg-dark-smooth-surface flex flex-col justify-center py-4 px-4 rounded-lg shadow-lg font-roboto"
              >
                <label className="pb-4 text-center up-mobile:text-lg text-base">Are you sure delete account?</label>
                <p className="text-center text-base">
                  If you <span className="text-red-500">delete</span> this account, you will{' '}
                  <span className="text-red-500">forever be unable to log in and use this account</span> and all data
                  will be deleted. Are you sure?
                </p>
                <div className="container mt-4 flex justify-between up-mobile:px-4">
                  {/* Cancel Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setDeleteAccount(false);
                    }}
                    className="py-2 px-2 bg-dark-smooth-button-default rounded-full hover:bg-dark-smooth-button-hover duration-100 ease-linear transition-colors"
                    autoFocus
                  >
                    Cancel
                  </button>

                  {/* Confirm Button */}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setConfirmDeleteAccount(true);
                    }}
                    className="py-2 px-2 bg-red-700 rounded-full hover:bg-red-500 duration-100 ease-linear transition-colors"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </motion.div>
          </ModalTemplete>
        )}
      </AnimatePresence>

      <div className="up-mobile:border-l-[1px] up-mobile:border-white/40 up-mobile:pl-2">
        <span className="ml-2 text-xl font-roboto text-dark-smooth-text-default">Advance</span>
        <div className="h-full up-mobile:flex up-mobile:flex-col py-4">
          <ButtonField
            title="Your mail is"
            color={`${isVerify ? '#15803D' : '#B91C1C'}`}
            onClick={handleOnSendEmail}
            hightlight={`${isVerify ? 'verified' : 'unverified'}`}
            titleButton="send verified email"
            classNameButton="underline text-blue-primary"
            className="text-xl"
          />
          <ButtonField
            title="If you want"
            color="#B91C1C"
            onClick={handleToDeleteEmail}
            hightlight="delete account"
            titleButton="delete"
            className="text-xl"
            classNameButton="text-red-500"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default AdvanceSetting;

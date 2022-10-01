import { useAppDispatch, useAppSelector } from '@src/services/Store';
import { requireAuthenticateUser } from '@src/services/Store/slices/reAuthenticate';
import { deleteUser, sendEmailVerification, User } from 'firebase/auth';
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

  // handle Event

  const handleOnSendEmail = async (e: React.MouseEvent) => {
    if (!auth) {
      return;
    }
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
      toast.promise(deleteUser(auth), {
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
            return 'error to delete account, please try again';
          },
        },
      });
    }
  };

  return (
    <React.Fragment>
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
            onClick={(e) => console.log(e)}
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

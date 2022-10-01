import FormContainer from '@src/components/FormContainer';
import { updateProfile } from '@src/services/Firebase/Update/updateProfile';
import { useAppSelector } from '@src/services/Store';
import { User } from 'firebase/auth';
import { Field } from 'formik';
import * as React from 'react';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import PublicField from './PublicField';
import PublicTextArea from './PublicTextArea';
import SaveChange from './SaveChange';
import SecretField from './SecretField';

interface IFormUpdateProps {
  access?: boolean;
  providerAccess?: boolean;
  auth: User | null;
}

export interface IDataSubmit {
  displayName: string;
  email: string;
  password?: string;
  description: string | undefined;
}

const initialValues = {
  email: '',
  description: '',
  displayName: '',
};

const FormUpdate: React.FunctionComponent<IFormUpdateProps> = (props) => {
  const { access, providerAccess, auth } = props;
  const userInfomation = useAppSelector((root) => root.userData.user?.information);
  const promtAuthenticateUser = useAppSelector((root) => root.reAuthenticate.promtAuthenticateUser);

  // Handle event
  const handleOnValidationSubmit = async (dataSubmit: IDataSubmit) => {
    // handle if user don't login
    if (!auth) {
      return;
    }
    const toastId = toast.loading('wait for seconds');
    try {
      await updateProfile(auth, dataSubmit);
      toast.update(toastId, {
        render() {
          return 'update success !';
        },
        type: 'success',
        closeButton: true,
        autoClose: 2000,
        isLoading: false,
      });
    } catch (error) {
      toast.update(toastId, {
        render() {
          return `${error}`;
        },
        type: 'error',
        closeButton: true,
        autoClose: 2000,
        isLoading: false,
      });
    }
  };

  const validationSchema: Yup.SchemaOf<IDataSubmit> = Yup.object().shape(
    {
      displayName: Yup.string().required('required firstname'),
      email: Yup.string().email().required('required email'),
      description: Yup.string().optional(),
      password: Yup.string().when('password', (val) => {
        if (val) {
          if (val.length > 0) {
            return Yup.string()
              .required()
              .min(8, 'Password too short')
              .test(
                'isValidPassWord',
                'is not valid password, A valid password consists of uppercase, characters, numbers and lower letters',
                (value) => {
                  const hasValid = [];
                  const hasUpperCase = /[A-Z]/.test(value ?? '');
                  const hasNumber = /[0-9]/.test(value ?? '');
                  const hasLowerCase = /[a-z]/.test(value ?? '');
                  const hasSymbol = /["!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~"]/.test(value ?? '');
                  hasValid.push(hasUpperCase, hasNumber, hasLowerCase, hasSymbol);
                  let validConditions = 0;
                  const numberOfMustBeValidConditions = hasValid.length;
                  hasValid.forEach((condition) => (condition ? validConditions++ : null));
                  if (validConditions >= numberOfMustBeValidConditions) {
                    return true;
                  } else {
                    return false;
                  }
                }
              );
          } else {
            return Yup.string().nullable();
          }
        } else {
          return Yup.string().nullable();
        }
      }),
    },
    [['password', 'password']]
  );

  return (
    <React.Fragment>
      <FormContainer
        className="text-white/80 relative w-full py-4 px-2"
        initialValues={userInfomation ?? initialValues}
        validationSchema={validationSchema}
        onSubmit={handleOnValidationSubmit}
      >
        {/* Field email */}
        <Field
          name={'email'}
          component={PublicField}
          access={access && providerAccess}
          label="Email"
          type={'text'}
          promtAuthenticateFor={promtAuthenticateUser}
        />
        {/* Field displayName */}
        <Field component={PublicField} name={'displayName'} access={access} label="Display Name" type={'text'} />

        {/* Field Password will hidden when user is not access by uid and provider */}
        {access && (
          <Field
            component={SecretField}
            name={'password'}
            access={providerAccess}
            label="Password"
            placeholder={'new password'}
            type={'password'}
            promtAuthenticateFor={promtAuthenticateUser}
          />
        )}

        {/* Field description is optional field about when user want public people see */}
        <Field component={PublicTextArea} name={'description'} access={access} label="About me"></Field>
        <SaveChange access={access} />
      </FormContainer>
    </React.Fragment>
  );
};

FormUpdate.defaultProps = {
  access: false,
};
export default FormUpdate;

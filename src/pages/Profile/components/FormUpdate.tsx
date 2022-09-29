import FormContainer from '@src/components/FormContainer';
import { useUserData } from '@src/services/context/UserData';
import { FastField } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';
import PublicField from './PublicField';
import PublicTextArea from './PublicTextArea';
import SaveChange from './SaveChange';
import SecretField from './SecretField';

interface IFormUpdateProps {
  onvalidationSubmit: (dataSubmit: IDataSubmit) => void;
  access?: boolean;

  providerAccess?: boolean;
  valueDefault: IDataSubmit;
}

export interface IDataSubmit {
  displayName: string;
  email: string;
  password?: string;
  description: string | undefined;
}

const FormUpdate: React.FunctionComponent<IFormUpdateProps> = (props) => {
  const { onvalidationSubmit, access, providerAccess, valueDefault } = props;

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
            return Yup.string().optional();
          }
        } else {
          return Yup.string().optional();
        }
      }),
    },
    [['password', 'password']]
  );
  return (
    <FormContainer
      className="text-white/80 relative w-full py-4 px-2"
      initialValues={valueDefault}
      validationSchema={validationSchema}
      onSubmit={onvalidationSubmit}
    >
      {/* Field email */}
      <FastField name={'email'} component={PublicField} access={access && providerAccess} label="Email" type={'text'} />
      {/* Field displayName */}
      <FastField component={PublicField} name={'displayName'} access={access} label="Display Name" type={'text'} />

      {/* Field Password will hidden when user is not access by uid and provider */}
      <FastField
        component={SecretField}
        name={'password'}
        access={access && providerAccess}
        label="Password"
        placeholder={'new password'}
        type={'password'}
      />

      {/* Field description is optional field about when user want public people see */}
      <FastField component={PublicTextArea} name={'description'} access={access} label="About me"></FastField>
      <SaveChange access={access} />
    </FormContainer>
  );
};

FormUpdate.defaultProps = {
  access: false,
  providerAccess: false,
};
export default FormUpdate;

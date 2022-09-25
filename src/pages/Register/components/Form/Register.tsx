import FormContainer from '@src/components/FormContainer';
import FormGroup from '@src/components/FormGroup';
import InputField from '@src/components/InputField';
import { Field } from 'formik';
import React, { Fragment } from 'react';
import * as Yup from 'yup';

interface IFormRegisterProps {}

interface IInitialValues {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}
const initialValues: IInitialValues = {
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const FormRegister: React.FunctionComponent<IFormRegisterProps> = (props) => {
  const ValidationSchema: Yup.SchemaOf<IInitialValues> = Yup.object().shape({
    firstname: Yup.string().required('required firstname'),
    lastname: Yup.string().required('required lastname'),
    email: Yup.string().email().required('required email'),
    password: Yup.string()
      .required('required password')
      .min(8, 'Password too short')
      .test(
        'isValidPassWord',
        'is not valid password, A valid password consists of uppercase, characters, numbers and lower letters',
        (value, context) => {
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
      ),
    confirmPassword: Yup.string()
      .required('required confirm password')
      .oneOf([Yup.ref('password'), null], 'Confirm password must be match password'),
  });
  return (
    <FormContainer
      initialValues={initialValues}
      validationSchema={ValidationSchema}
      onSubmit={(props) => console.log(props)}
    >
      <Fragment>
        <FormGroup className="up-mobile:flex-row flex-col flex justify-between w-full">
          <Field
            name={'firstname'}
            component={InputField}
            label={'Firstname'}
            background={'bg-dark-smooth-on-surface'}
            type={'text'}
            placeholder={'Your firstname'}
          />
          <Field
            name={'lastname'}
            component={InputField}
            label={'lastname'}
            background={'bg-dark-smooth-on-surface'}
            type={'text'}
            placeholder={'Your lastname'}
          />
        </FormGroup>
        <Field
          name={'email'}
          component={InputField}
          label={'Email'}
          background={'bg-dark-smooth-on-surface'}
          type={'text'}
          placeholder={'Your Email'}
        />
        <Field
          name={'password'}
          component={InputField}
          label={'Password'}
          background={'bg-dark-smooth-on-surface'}
          type={'password'}
          placeholder={'Password'}
        />
        <Field
          name={'confirmPassword'}
          component={InputField}
          label={'Confirm password'}
          background={'bg-dark-smooth-on-surface'}
          type={'password'}
          placeholder={'Confirm password'}
        />

        <button
          type="submit"
          className="text-dark-smooth-text-primary text-lg font-roboto flex justify-center w-full mt-8 mb-2 py-2 px-2 bg-gradient-to-bl to-dark-smooth-primary/60 via-dark-smooth-primary/75 from-dark-smooth-primary rounded-lg"
        >
          Login
        </button>
      </Fragment>
    </FormContainer>
  );
};

export default FormRegister;

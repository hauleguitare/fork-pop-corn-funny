import { Field, Formik } from 'formik';
import React, { Fragment } from 'react';
import * as Yup from 'yup';
import FormContainer from '../FormContainer';
import InputField from '../InputField';

interface IFormLoginProps {}

interface IInitialValues {
  email: string;
  password: string;
}

const initialValues: IInitialValues = {
  email: '',
  password: '',
};

const FormLogin: React.FunctionComponent<IFormLoginProps> = (props) => {
  const validationSchema: Yup.SchemaOf<IInitialValues> = Yup.object().shape({
    email: Yup.string().email().required('required email'),
    password: Yup.string().required('required password'),
  });

  return (
    <FormContainer
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(props) => console.log(props)}
    >
      <Fragment>
        <Field
          name={'email'}
          component={InputField}
          label={'Email'}
          background={'bg-dark-smooth-on-surface'}
          type={'text'}
          placeholder={'email'}
        />
        <Field
          name={'password'}
          component={InputField}
          label={'Password'}
          background={'bg-dark-smooth-on-surface'}
          type={'password'}
          placeholder={'your password'}
        />
        <a href="/" className="flex justify-end pt-2 italic">
          Forgot password?
        </a>
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

export default FormLogin;
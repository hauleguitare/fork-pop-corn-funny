import { Field } from 'formik';
import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import FormContainer from '../../../../components/FormContainer';
import InputField from '../../../../components/InputField';

interface IFormLoginProps {
  onValidationSubmit: (dataSubmit: IDataSubmit) => void;
}

export interface IDataSubmit {
  email: string;
  password: string;
}

const initialValues: IDataSubmit = {
  email: '',
  password: '',
};

const FormLogin: React.FunctionComponent<IFormLoginProps> = (props) => {
  const { onValidationSubmit } = props;
  const validationSchema: Yup.SchemaOf<IDataSubmit> = Yup.object().shape({
    email: Yup.string().email().required('required email'),
    password: Yup.string().required('required password'),
  });

  return (
    <FormContainer
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(props) => onValidationSubmit(props as IDataSubmit)}
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
        <div className="flex justify-end pt-2 px-2">
          <Link to="/forgot-password" className="italic underline text-blue-primary">
            Forgot password?
          </Link>
        </div>
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

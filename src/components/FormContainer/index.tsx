import { Form, Formik, FormikValues } from 'formik';
import React, { Fragment } from 'react';
import * as Yup from 'yup';
import { InferType } from 'yup';
import { ObjectShape } from 'yup/lib/object';

interface IFormContainerProps<T> {
  initialValues: T; // initialvalues for formik
  validationSchema: Yup.SchemaOf<T>; // i using schema from yup
  onSubmit: (props: T) => void; // handle onSubmit when passing yup
  children?: React.ReactNode;
}

// I using generic to reuse component with formik
function FormContainer<T extends FormikValues>(props: IFormContainerProps<T>): JSX.Element {
  const { initialValues, validationSchema, onSubmit, children } = props;
  return (
    <Formik validationSchema={validationSchema} initialValues={initialValues} onSubmit={onSubmit}>
      {(props) => (
        <div className="text-white/80 relative bg-dark-smooth-surface rounded-lg overflow-hidden w-full py-4 px-2">
          <Form>{children}</Form>
        </div>
      )}
    </Formik>
  );
}

export default FormContainer;

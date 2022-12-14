import FormGroup from '@src/components/FormGroup';
import { useAppDispatch } from '@src/services/Store';
import { requireAuthenticateUser } from '@src/services/Store/slices/reAuthenticate';
import { FieldProps } from 'formik';
import * as React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';

interface IPublicFieldProps {
  type: React.HTMLInputTypeAttribute;
  label: string;
  access?: boolean;
  className?: string;
  promtAuthenticateFor?: boolean;
}

const PublicField: React.FunctionComponent<IPublicFieldProps & FieldProps> = (props) => {
  const { type, label, access, className, promtAuthenticateFor, field, form } = props;
  const { name, value, onChange, onBlur } = field;
  const dispatch = useAppDispatch();
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const [updateField, setUpdateField] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.disabled = !updateField;
      ref.current.focus();
    }
  }, [updateField]);

  // Handle Event
  const handleOnBlurInput = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setUpdateField(false);
    }
  };

  const handleOnClickEdit = () => {
    if (promtAuthenticateFor) {
      dispatch(requireAuthenticateUser());
    } else {
      setUpdateField(true);
    }
  };

  return (
    <FormGroup onBlur={handleOnBlurInput} className={className}>
      <label className="pb-2">{label}</label>
      <div className="relative">
        <input
          ref={ref}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={`bg-dark-smooth-on-surface outline-none py-2 px-2 text-dark-smooth-text-default rounded-lg w-full`}
        />
        {access && (
          <React.Fragment>
            {!updateField && (
              <button
                type="button"
                onClick={handleOnClickEdit}
                className="absolute top-0 right-0 my-2 mr-2 w-6 h-6 z-10"
              >
                <AiOutlineEdit className="w-full h-full" />
              </button>
            )}
          </React.Fragment>
        )}
      </div>
      {showError ? <label className="text-sm text-red-400 italic">{errors[name]?.toString()}</label> : undefined}
    </FormGroup>
  );
};

PublicField.defaultProps = {
  access: false,
  promtAuthenticateFor: false,
};

export default PublicField;

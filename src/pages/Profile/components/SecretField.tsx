import FormGroup from '@src/components/FormGroup';
import { FieldProps } from 'formik';
import * as React from 'react';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface ISecretFieldProps {
  type: React.HTMLInputTypeAttribute;
  label: string;
  access?: boolean;
}

const SecretField: React.FunctionComponent<ISecretFieldProps & FieldProps> = (props) => {
  const { type, label, access, field, form } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const [updateField, setUpdateField] = React.useState(false);
  const [visiblePassword, setVisiblePassword] = React.useState(false);
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.disabled = !updateField;
      ref.current.focus();
      ref.current.select();
    }
  }, [updateField]);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.type = visiblePassword ? 'text' : 'password';
    }
  }, [visiblePassword]);

  const handleOnBlurInput = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setUpdateField(false);
    }
  };

  const handleOnClickVisible = () => {
    setVisiblePassword(true);
  };

  const handleOnClickInVisible = () => {
    setVisiblePassword(false);
  };

  const handleOnClickEdit = () => {
    setUpdateField(true);
  };
  if (!access) {
    return null;
  }

  return (
    <FormGroup onBlur={handleOnBlurInput} className="flex flex-col py-2 px-2">
      <label className="pb-2 text-dark-smooth-text-default/80">{label}</label>
      <div className="relative">
        <input
          ref={ref}
          type={type}
          value={value}
          placeholder={'New password'}
          name={name}
          onChange={onChange}
          onBlur={onBlur}
          className={`py-2 pl-2 bg-dark-smooth-on-surface rounded-md shadow-md outline-none w-full`}
        />
        <React.Fragment>
          {visiblePassword ? (
            <button
              type="button"
              onClick={handleOnClickInVisible}
              className="absolute top-0 right-0 my-2 mr-2 w-6 h-6 z-10"
            >
              <MdVisibilityOff className="w-full h-full" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleOnClickVisible}
              className="absolute top-0 right-0 my-2 mr-2 w-6 h-6 z-10"
            >
              <MdVisibility className="w-full h-full" />
            </button>
          )}
        </React.Fragment>
        {!updateField && (
          <button
            type="button"
            onClick={handleOnClickEdit}
            className="pb-2 px-1 justify-end right-0 top-0 absolute -translate-y-full rounded-lg text-red-600 focus:text-red-400 duration-150 transition-colors"
          >
            Change
          </button>
        )}
      </div>
      {showError ? <label className="text-sm text-red-400 italic">{errors[name]?.toString()}</label> : undefined}
    </FormGroup>
  );
};

SecretField.defaultProps = {
  access: false,
};

export default SecretField;

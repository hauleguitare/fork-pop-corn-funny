import FormGroup from '@src/components/FormGroup';
import Input from '@src/components/Input';
import * as React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { CgUndo } from 'react-icons/cg';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface ISecretFieldProps {
  initialValue: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  access?: boolean;
}

const SecretField: React.FunctionComponent<ISecretFieldProps> = (props) => {
  const { initialValue, type, label, access } = props;
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
    if (ref.current) {
      setVisiblePassword(true);
      // ref.current.type = 'text';
    }
  };

  const handleOnClickInVisible = () => {
    if (ref.current) {
      setVisiblePassword(false);
      // ref.current.type = 'password';
    }
  };

  const handleOnClickEdit = () => {
    setUpdateField(true);
  };

  const handleOnClickUndo = (e: React.MouseEvent) => {
    if (ref.current) {
      ref.current.value = initialValue;
      setUpdateField(false);
    }
  };
  if (!access) {
    return null;
  }

  return (
    <FormGroup onBlur={handleOnBlurInput}>
      <Input ref={ref} type={type} label={label} background="bg-dark-smooth-on-surface" defaultValue={initialValue}>
        <React.Fragment>
          {visiblePassword ? (
            <button onClick={handleOnClickInVisible} className="absolute top-0 right-0 my-2 mr-2 w-6 h-6 z-10">
              <MdVisibilityOff className="w-full h-full" />
            </button>
          ) : (
            <button onClick={handleOnClickVisible} className="absolute top-0 right-0 my-2 mr-2 w-6 h-6 z-10">
              <MdVisibility className="w-full h-full" />
            </button>
          )}
        </React.Fragment>
        {!updateField ? (
          <button
            onClick={handleOnClickEdit}
            className="pb-2 px-1 justify-end right-0 top-0 absolute -translate-y-full rounded-lg text-red-600 focus:text-red-400 duration-150 transition-colors"
          >
            Change
          </button>
        ) : (
          <button
            onClick={handleOnClickUndo}
            className="pb-2 px-1 justify-end right-0 top-0 absolute -translate-y-full rounded-lg text-dark-smooth-primary focus:text-red-400 duration-150 transition-colors"
          >
            Undo
          </button>
        )}
      </Input>
    </FormGroup>
  );
};

SecretField.defaultProps = {
  access: false,
};

export default SecretField;

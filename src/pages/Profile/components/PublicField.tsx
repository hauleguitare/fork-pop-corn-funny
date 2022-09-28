import FormGroup from '@src/components/FormGroup';
import Input from '@src/components/Input';
import * as React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { CgUndo } from 'react-icons/cg';

interface IPublicFieldProps {
  initialValue: string;
  type: React.HTMLInputTypeAttribute;
  label: string;
  accessEdit?: boolean;
  className?: string;
}

const PublicField: React.FunctionComponent<IPublicFieldProps> = (props) => {
  const { initialValue, type, label, accessEdit, className } = props;
  const [updateField, setUpdateField] = React.useState(false);
  const [defaultValue, setDefaulValue] = React.useState(initialValue);
  const ref = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (ref.current) {
      ref.current.disabled = !updateField;
      ref.current.focus();
      ref.current.select();
    }
  }, [updateField]);

  // Handle Event
  const handleOnBlurInput = (e: React.FocusEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setUpdateField(false);
    }
  };

  const handleOnClickEdit = () => {
    setUpdateField(true);
  };

  const handleOnClickUndo = (e: React.MouseEvent) => {
    if (ref.current) {
      ref.current.value = defaultValue;
      setUpdateField(false);
    }
  };

  return (
    <FormGroup onBlur={handleOnBlurInput} className={className}>
      <Input ref={ref} type={type} label={label} background="bg-dark-smooth-on-surface" defaultValue={defaultValue}>
        {accessEdit && (
          <React.Fragment>
            {!updateField ? (
              <button onClick={handleOnClickEdit} className="absolute top-0 right-0 my-2 mr-2 w-6 h-6 z-10">
                <AiOutlineEdit className="w-full h-full" />
              </button>
            ) : (
              <button onClick={handleOnClickUndo} className="absolute top-0 right-0 my-2 mr-2 w-6 h-6 z-10">
                <CgUndo className="w-full h-full" />
              </button>
            )}
          </React.Fragment>
        )}
      </Input>
    </FormGroup>
  );
};

PublicField.defaultProps = {
  accessEdit: false,
};

export default PublicField;

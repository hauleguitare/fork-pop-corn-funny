import FormGroup from '@src/components/FormGroup';
import TextArea from '@src/components/TextArea';
import { FieldProps } from 'formik';
import * as React from 'react';
import { AiOutlineEdit } from 'react-icons/ai';
import { CgUndo } from 'react-icons/cg';

interface IPublicTextAreaProps {
  label: string;
  access?: boolean;
  className?: string;
}

const PublicTextArea: React.FunctionComponent<IPublicTextAreaProps & FieldProps> = (props) => {
  const { label, access, className, field, form } = props;
  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  const [updateField, setUpdateField] = React.useState(false);
  const ref = React.useRef<HTMLTextAreaElement>(null);

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

  return (
    <FormGroup onBlur={handleOnBlurInput} className={className}>
      <label className="pb-2">{label}</label>
      <div className="relative">
        <textarea
          rows={6}
          maxLength={255}
          ref={ref}
          name={name}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          className={`bg-dark-smooth-on-surface outline-none py-2 px-2 text-dark-smooth-text-default rounded-lg w-full`}
        />
        {access && (
          <React.Fragment>
            {!updateField && (
              <button onClick={handleOnClickEdit} className="absolute top-0 right-0 my-2 mr-2 w-6 h-6 z-10">
                <AiOutlineEdit className="w-full h-full" />
              </button>
            )}
          </React.Fragment>
        )}
        {showError ? <label className="text-sm text-red-400 italic">{errors[name]?.toString()}</label> : undefined}
      </div>
    </FormGroup>
  );
};

PublicTextArea.defaultProps = {
  access: false,
};

export default PublicTextArea;

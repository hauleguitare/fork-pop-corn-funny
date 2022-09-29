import * as React from 'react';

interface ISaveChangeProps {
  access?: boolean;
}

const SaveChange: React.FunctionComponent<ISaveChangeProps> = (props) => {
  const { access } = props;
  if (!access) {
    return null;
  }
  return (
    <div className="up-mobile:mx-4 my-4 flex justify-center up-mobile:justify-end">
      <button
        type="submit"
        className="py-2 px-2 bg-dark-smooth-primary/70 text-xl rounded-lg hover:bg-dark-smooth-primary transition-all duration-150 ease-in"
      >
        Save Change
      </button>
    </div>
  );
};

SaveChange.defaultProps = {
  access: false,
};

export default SaveChange;

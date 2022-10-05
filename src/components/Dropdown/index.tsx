import * as React from 'react';
import { IconType } from 'react-icons';

interface IDropdownProps {
  parentId: string;
  title: string;
  children?: React.ReactNode;
  Icon?: IconType;
}

const Dropdown: React.FunctionComponent<IDropdownProps> = (props) => {
  const { parentId, title, children, Icon } = props;
  return (
    <ul className="relative">
      <li className="relative" id={parentId}>
        <div
          className="flex items-center gap-4 overflow-hidden text-white/80 text-ellipsis whitespace-nowrap rounded hover:bg-transparent transition duration-300 ease-in-out cursor-pointer"
          data-mdb-ripple="true"
          data-mdb-ripple-color="dark"
          data-bs-toggle="collapse"
          data-bs-target={`#collapse${parentId}`}
          aria-expanded="true"
          aria-controls={`collapse${parentId}`}
        >
          {Icon && <Icon size={'30px'} />}
          <span>{title}</span>
        </div>
        {children}
      </li>
    </ul>
  );
};

export default Dropdown;

/*
<ul
          className="relative accordion-collapse collapse"
          id="{`collapseSidenavEx1`}"
          aria-labelledby="sidenavEx1"
          data-bs-parent="#sidenavExample"
        >
          <li className="relative">
            <a
              href="#!"
              className="flex items-center text-base overflow-hidden text-dark-smooth-text-default/60 text-ellipsis whitespace-nowrap rounded hover:bg-transparent transition duration-300 ease-in-out"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
            >
              Link 1
            </a>
          </li>
        </ul>

*/

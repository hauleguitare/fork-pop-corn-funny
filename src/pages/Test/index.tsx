import * as React from 'react';

interface ITestPageProps {}

const TestPage: React.FunctionComponent<ITestPageProps> = (props) => {
  return (
    <div className="h-screen">
      <div className="w-60 h-full shadow-md bg-white px-1 absolute" id="sidenavExample">
        <ul className="relative">
          <li className="relative" id="sidenavEx1">
            <a
              className="flex items-center text-sm py-4 px-6 h-12 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out cursor-pointer"
              data-mdb-ripple="true"
              data-mdb-ripple-color="dark"
              data-bs-toggle="collapse"
              data-bs-target="#collapseSidenavEx1"
              aria-expanded="true"
              aria-controls="collapseSidenavEx1"
            >
              <span>Click here 1</span>
            </a>
            <ul
              className="relative accordion-collapse collapse"
              id="collapseSidenavEx1"
              aria-labelledby="sidenavEx1"
              data-bs-parent="#sidenavExample"
            >
              <li className="relative">
                <a
                  href="#!"
                  className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  Link 1
                </a>
              </li>
              <li className="relative">
                <a
                  href="#!"
                  className="flex items-center text-xs py-4 pl-12 pr-6 h-6 overflow-hidden text-gray-700 text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                >
                  Link 2
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TestPage;

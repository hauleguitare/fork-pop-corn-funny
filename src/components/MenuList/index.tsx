import { IMenuList } from '@src/@types/__global__';
import React, { Fragment, useState } from 'react';
import ListItem from '../ListItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { Link } from 'react-router-dom';

interface IMenuListProps {
  list: IMenuList[];
  className?: string | undefined;
  childClassName?: string | undefined;
}

const MenuList: React.FunctionComponent<IMenuListProps> = (props) => {
  const { list, className, childClassName } = props;
  return (
    <ListItem
      className={className}
      items={list}
      renderItem={(item) => {
        return (
          <li key={item.id}>
            <span>{item.name}</span>
            {item.dropdownMenu && (
              <ListItem
                items={item.dropdownMenu}
                className={childClassName}
                renderItem={(dropdown) => (
                  <li key={dropdown.id}>
                    <Link to={`${item.url}${dropdown.url}`}>
                      <span>{dropdown.name}</span>
                    </Link>
                  </li>
                )}
              />
            )}
          </li>
        );
      }}
    />
  );
};

MenuList.defaultProps = {
  className: '',
  childClassName: '',
};

export default MenuList;

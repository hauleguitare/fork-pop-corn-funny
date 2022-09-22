import { IMenuList } from '@src/@types/__global__';
import React, { Fragment, useState } from 'react';
import ListItem from '../ListItem';
import { useAutoAnimate } from '@formkit/auto-animate/react';

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
                    <span>{dropdown.name}</span>
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

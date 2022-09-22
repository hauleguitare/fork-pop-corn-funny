import * as React from 'react';

interface IListItemProps<T, As extends React.ElementType> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  as?: As;
  className?: string;
}

function ListItem<T, As extends React.ElementType>(
  props: IListItemProps<T, As> & Omit<React.ComponentPropsWithoutRef<As>, keyof IListItemProps<T, As>>
) {
  const { items, renderItem, as, className, ...rest } = props;
  const Component = as ?? 'ul';
  return <Component className={className}>{items.map(renderItem)}</Component>;
}

export default ListItem;

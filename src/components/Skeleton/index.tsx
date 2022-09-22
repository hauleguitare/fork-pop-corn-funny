import * as React from 'react';

interface ISkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
    className?: string;
    children?: React.ReactNode;
}

const Skeleton: React.FunctionComponent<ISkeletonProps> = (props) => {
    const { className, children, ...rest } = props;
    return (
        <div className={`${className} animate-pulse`} {...rest}>
            {children}
        </div>
    );
};

export default Skeleton;

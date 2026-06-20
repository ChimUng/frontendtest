import { ReactNode, ElementType } from 'react';
import { CONTAINER_CLASS } from '@/lib/layout';

interface ContainerProps {
    children: ReactNode;
    className?: string;
    as?: ElementType;
}

function Container({ children, className = '', as: Tag = 'div' }: ContainerProps) {
    return (
        <Tag className={`${CONTAINER_CLASS} ${className}`}>
            {children}
        </Tag>
    );
}

export default Container;
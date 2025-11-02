import type { PropsWithChildren } from 'react';
import clsx from 'clsx';

export function Card({ children, className }: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={clsx('rounded-2xl bg-white shadow-sm ring-1 ring-gray-200', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('p-6', className)}>{children}</div>;
}

export function CardFooter({ children, className }: PropsWithChildren<{ className?: string }>) {
  return <div className={clsx('px-6 pb-6', className)}>{children}</div>;
}



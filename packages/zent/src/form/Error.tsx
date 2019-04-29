import * as React from 'react';
import { IMaybeErrors } from 'formulr';
import cx from 'classnames';

export interface IFormErrorProps {
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}

export function formFirstError<T>(errors: IMaybeErrors<T>) {
  if (errors === null) {
    return null;
  }
  const name: string = Object.keys(errors)[0];
  return errors[name].message;
}

export const FormError = React.forwardRef<HTMLDivElement, IFormErrorProps>(
  ({ className, style, prefix = 'zent', children }, ref) => (
    <div
      ref={ref}
      className={cx(`${prefix}-form-error`, className)}
      style={style}
    >
      {children}
    </div>
  )
);

FormError.displayName = 'ZentFormError';

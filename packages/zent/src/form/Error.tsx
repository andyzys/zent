import * as React from 'react';
import cx from 'classnames';

export interface IFormErrorProps {
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
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

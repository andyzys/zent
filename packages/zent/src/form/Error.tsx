import * as React from 'react';
import { IMaybeErrors, IValidateResult } from 'formulr';
import cx from 'classnames';

export interface IFormErrorProps<T> {
  prefix?: string;
  className?: string;
  style?: React.CSSProperties;
  error: IValidateResult<T>;
}

export function formFirstError<T>(errors: IMaybeErrors<T>) {
  if (errors === null) {
    return null;
  }
  const name: string = Object.keys(errors)[0];
  return <FormError error={errors[name]} />;
}

export const FormError = React.forwardRef<
  HTMLDivElement,
  IFormErrorProps<unknown>
>(({ error, className, style, prefix = 'zent' }, ref) => (
  <div
    ref={ref}
    className={cx(`${prefix}-form-error`, className)}
    style={style}
  >
    {error.message}
  </div>
));

FormError.displayName = 'ZentFormError';

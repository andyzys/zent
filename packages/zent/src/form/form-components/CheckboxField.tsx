import * as React from 'react';
import cx from 'classnames';
import { Omit } from 'utility-types';
import Checkbox, { ICheckboxProps, ICheckboxEvent } from '../../checkbox';
import { FormControl, IFormControlProps } from '../Control';
import { useField, IFormFieldCommonProps, defaultRenderError } from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormCheckboxFieldProps
  extends Omit<ICheckboxProps, 'onChange' | 'checked'>,
    IFormControlProps<boolean> {}

function mapCheckboxEventToValue(e: ICheckboxEvent) {
  return e.target.checked;
}

export const FormCheckboxField = (
  props: IFormCheckboxFieldProps & IFormFieldCommonProps<boolean>
) => {
  const [{ value, ...passedProps }, { error }, ref] = useField<
    boolean,
    ICheckboxEvent
  >(props, false, mapCheckboxEventToValue);
  const {
    className,
    style,
    label,
    prefix,
    renderError = defaultRenderError,
    required,
    description,
    notice,
    ...otherProps
  } = props;
  return (
    <FormControl
      ref={ref as any}
      className={cx(className)}
      style={style}
      label={label}
      prefix={prefix}
      invalid={!!error}
    >
      <Checkbox
        prefix={prefix}
        {...otherProps}
        {...passedProps}
        checked={value}
      />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};

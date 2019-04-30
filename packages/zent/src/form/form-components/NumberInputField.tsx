import * as React from 'react';
import { Omit } from 'utility-types';

import NumberInput, { INumberInputProps } from '../../number-input';
import { IFormControlProps, FormControl } from '../Control';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormNumberInputFieldProps
  extends Omit<INumberInputProps, 'onChange' | 'value' | 'name'>,
    IFormControlProps<string> {}

export const FormNumberInputField: React.FunctionComponent<
  IFormNumberInputFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [childProps, { error }, ref] = useField(props, '', noopMapEventToValue);
  const {
    className,
    style,
    label,
    prefix,
    renderError = defaultRenderError,
    required,
    description,
    notice,
    defaultValue,
    ...otherProps
  } = props;
  return (
    <FormControl
      ref={ref as any}
      className={className}
      style={style}
      label={label}
      prefix={prefix}
      invalid={!!error}
    >
      <NumberInput prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};

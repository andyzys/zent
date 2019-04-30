import * as React from 'react';
import { Omit } from 'utility-types';
import ColorPicker, { IColorPickerProps } from '../../colorpicker';
import { IFormControlProps, FormControl } from '../Control';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormColorPickerFieldProps
  extends Omit<IColorPickerProps, 'color' | 'onChange'>,
    IFormControlProps<string> {}

export const FormColorPickerField: React.FunctionComponent<
  IFormColorPickerFieldProps & IFormFieldCommonProps<string>
> = props => {
  const [{ value, ...passedProps }, { error }, ref] = useField<string>(
    props,
    '',
    noopMapEventToValue
  );
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
      className={className}
      style={style}
      label={label}
      prefix={prefix}
      required={required}
      invalid={!!error}
    >
      <ColorPicker
        prefix={prefix}
        {...otherProps}
        {...passedProps}
        color={value}
      />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};

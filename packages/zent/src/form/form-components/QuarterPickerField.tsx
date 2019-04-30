import * as React from 'react';
import { Omit } from 'utility-types';
import QuarterPicker, {
  IQuarterPickerProps,
  QuarterPickerValue,
} from '../../datetimepicker/QuarterPicker';
import { IFormControlProps, FormControl } from '../Control';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormQuarterPickerFieldProps
  extends Omit<IQuarterPickerProps, 'value' | 'onChange'>,
    IFormControlProps<QuarterPickerValue> {}

export const FormQuarterPickerField: React.FunctionComponent<
  IFormQuarterPickerFieldProps & IFormFieldCommonProps<QuarterPickerValue>
> = props => {
  const [childProps, { error }, ref] = useField(props, [], noopMapEventToValue);
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
      invalid={!!error}
    >
      <QuarterPicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};

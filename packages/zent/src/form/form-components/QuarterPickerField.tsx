import * as React from 'react';
import { Omit } from 'utility-types';
import QuarterPicker, {
  IQuarterPickerProps,
  QuarterPickerValue,
} from '../../datetimepicker/QuarterPicker';
import { IFormControlProps, FormControl } from '../Control';
import {
  IFormFieldCommonProps,
  noopMapEventToValue,
  useField,
} from '../shared';
import { formFirstError } from '../Error';
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
    renderError = formFirstError,
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

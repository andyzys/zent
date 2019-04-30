import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormControlProps, FormControl } from '../Control';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  defaultRenderError,
} from '../shared';
import YearPicker, { IYearPickerProps } from '../../datetimepicker/YearPicker';
import { DatePickers } from '../../datetimepicker/common/types';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormYearPickerFieldProps
  extends Omit<IYearPickerProps, 'value' | 'onChange'>,
    IFormControlProps<DatePickers.Value> {}

export const FormYearPickerField: React.FunctionComponent<
  IFormYearPickerFieldProps & IFormFieldCommonProps<DatePickers.Value>
> = props => {
  const [childProps, { error }, ref] = useField(
    props,
    dateDefaultValueFactory,
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
      invalid={!!error}
    >
      <YearPicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};

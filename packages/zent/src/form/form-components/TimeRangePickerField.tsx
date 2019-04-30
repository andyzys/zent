import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormControlProps, FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
} from '../shared';
import TimeRangePicker, {
  ITimeRangePickerProps,
} from '../../datetimepicker/TimeRangePicker';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormTimeRangePickerFieldProps
  extends Omit<ITimeRangePickerProps, 'onChange' | 'value'>,
    IFormControlProps<[DatePickers.Value, DatePickers.Value]> {}

function dateDefaultValueFactory(): [DatePickers.Value, DatePickers.Value] {
  return [new Date(), new Date()];
}

export const FormTimeRangePickerField: React.FunctionComponent<
  IFormTimeRangePickerFieldProps &
    IFormFieldCommonProps<[DatePickers.Value, DatePickers.Value]>
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
      <TimeRangePicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};

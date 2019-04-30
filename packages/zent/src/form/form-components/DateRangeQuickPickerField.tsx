import * as React from 'react';
import { Omit } from 'utility-types';
import DateRangeQuickPicker, {
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import { IFormControlProps, FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormDateRangeQuickPickerFieldProps
  extends Omit<IDateRangeQuickPickerProps, 'onChange' | 'value'>,
    IFormControlProps<DatePickers.RangeValue> {}

function dateDefaultValueFactory(): DatePickers.RangeValue {
  return [new Date(), new Date()];
}

export const FormDateRangeQuickPickerField: React.FunctionComponent<
  IFormDateRangeQuickPickerFieldProps &
    IFormFieldCommonProps<DatePickers.RangeValue>
> = props => {
  const [childProps, { error }, ref] = useField<DatePickers.RangeValue>(
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
      <DateRangeQuickPicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};

import * as React from 'react';
import { Omit } from 'utility-types';
import { IFormControlProps, FormControl } from '../Control';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormFieldCommonProps,
  useField,
  noopMapEventToValue,
  dateDefaultValueFactory,
  defaultRenderError,
} from '../shared';
import TimePicker, { ITimePickerProps } from '../../datetimepicker/TimePicker';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormTimePickerField
  extends Omit<ITimePickerProps, 'onChange' | 'value'>,
    IFormControlProps<DatePickers.Value> {}

export const FormTimePickerField: React.FunctionComponent<
  IFormTimePickerField & IFormFieldCommonProps<DatePickers.Value>
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
      <TimePicker prefix={prefix} {...otherProps} {...childProps} />
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {renderError(error)}
    </FormControl>
  );
};

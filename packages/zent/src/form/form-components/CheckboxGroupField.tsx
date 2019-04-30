import * as React from 'react';
import { Omit } from 'utility-types';
import { ICheckboxGroupProps, CheckboxGroup } from '../../checkbox';
import { IFormControlProps, FormControl } from '../Control';
import {
  useField,
  IFormFieldCommonProps,
  noopMapEventToValue,
  defaultRenderError,
} from '../shared';
import { FormDescription } from '../Description';
import { FormNotice } from '../Notice';

export interface IFormCheckboxGroupFieldProps<T>
  extends Omit<ICheckboxGroupProps, 'value' | 'onChange'>,
    IFormControlProps<T[]> {
  children?: React.ReactNode;
}

export function FormCheckboxGroupField<T>(
  props: IFormCheckboxGroupFieldProps<T> & IFormFieldCommonProps<T[]>
) {
  const [childProps, { error }, ref] = useField<T[], T[]>(
    props,
    [],
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
    children,
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
      <CheckboxGroup prefix={prefix} {...otherProps} {...childProps}>
        {children}
      </CheckboxGroup>
      {!!notice && <FormNotice prefix={prefix}>{notice}</FormNotice>}
      {!!description && (
        <FormDescription prefix={prefix}>{description}</FormDescription>
      )}
      {defaultRenderError(error)}
    </FormControl>
  );
}

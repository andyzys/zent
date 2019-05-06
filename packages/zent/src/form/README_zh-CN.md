---
title: Form
subtitle: 表单
path: component/form
group: 数据
scatter: true
---

## Form 表单组件

1. [使用指南](#shi-yong-zhi-nan)
2. [表单校验](#biao-dan-xiao-yan)
3. [格式化 value](#ge-shi-hua-value)
4. [表单操作](#biao-dan-cao-zuo)
5. [其他](#qi-ta)
6. [组件原理](#zu-jian-yuan-li)
7. [其他说明](#qi-ta-shuo-ming)
8. [API](#api)

### 使用指南

#### 表单 `Form`

- `Form` 组件提供三种样式：`inline`，`horizontal`， `vertical`。
- 使用 `Form` 组件，必须先调用 `createForm` 方法包装，为表单注入 `zentForm` 属性，从而提供表单和表单元素的各种操作方法，详见 demo 和 [`zentForm` API](#zentform) 。

#### 表单域 `Field`

`Field` 组件本质上是一个辅助性的组件，不提供任何样式，只负责管理表单元素 value 值的生命周期和表单元素的 error 等信息。

- `Field` 必须要有 `name` 属性；
- `Field` 的展现形式由 `component` 属性传入的组件决定，`Form` 组件中内置了常用的表单元素组件，也可以使用单独封装的自定义表单元素组件。
  - `FormInputField`
  - `FormSelectField`
  - `FormRadioGroupField`
  - `FormCheckboxField`
  - `FormCheckboxGroupField`
  - `FormNumberInputField`
  - `FormSwitchField`
  - `FormColorPickerField`
  - `FormDatePickerField`
  - `FormWeekPickerField`
  - `FormMonthPickerField`
  - `FormQuarterPickerField`
  - `FormYearPickerField`
  - `FormTimePickerField`
  - `FormTimeRangePickerField`
  - `FormDateRangePickerField`
  - `FormDateRangeQuickPickerField`
- `Form` 组件提供了 `getControlGroup` 方法，可以快速封装自定义表单元素组件，使用方法参考 demo 和 [`getControlGroup` API](#form-getcontrolgroup) 。

注：底层组件中的 `format` 属性因为名称和 `Field` 上的 `format` 属性冲突，`FormDatePickerField` 以及其他年月日相关的 `XyzPickerField` 的 `format` 属性变更为 `dateFormat`；`FormTimePickerField` 以及 `FormTimeRangePickerField` 的 `format` 属性变更为 `timeFormat`。

<!-- demo-slot-1 -->
<!-- demo-slot-2 -->
<!-- demo-slot-3 -->

### 表单校验

#### 表单校验的使用

- 当`FormStrategy`是`View`，`useField`第二个参数支持传入 `Validators` 来指定校验规则和校验提示；
- `validations` 对象支持预置的内部校验规则（详见[内置 validation rules](#nei-zhi-validation-rules) ）, 也支持传入自定义的校验函数，详见下面一小节；

自定义表单校验函数定义:
```ts
function validate<T>(value: T, ctx: ValidatorContext): IMaybeError<T> | Promise<IMaybeError<T>> | Observable<IMaybeError<T>>;
```

- 如果返回 `null` 表示校验通过，当校验失败时返回一个包含错误信息的对象。
- 支持返回`Promise`或`Observable`进行异步校验

<!-- demo-slot-4 -->

### 其他

#### `Form` 布局

`Form` 组件使用`flex`布局，提供两种简单的样式：水平布局 `horizontal`， 垂直布局 `vertical`。

<!-- demo-slot-5 -->

#### `Field Array`

<!-- demo-slot-6 -->

### API

#### **`Form`**

对 html 中 form 元素的一个简单封装, 提供默认的 className。除了 form 元素本身的属性外，还提供以下属性。当 onSubmit 没有传入时，默认会将 submit 事件 `preventDefault`。

| 参数 | 说明     | 类型                        | 默认值 | 是否必填 |
| ---- | -------- | --------------------------- | ------ | -------- |
| type | 布局类型 | `'vertical' | 'horizontal'` |        |          |

##### **`Form`**

经过 `Form.createForm` 包装的组件通过 props 被添加了 `zenForm` 属性, 可以通过 `this.props.zentForm` 访问, `zentForm` 提供的 API 如下：

| 参数          | 说明                                          | 类型                                                                   |
| ------------- | --------------------------------------------- | ---------------------------------------------------------------------- |
| getFormValues | 获取与 form 绑定的所有表单元素值              | func                                                                   |
| getFieldError | 获取某个 Field 的错误信息, 没有报错信息返回空 | func(name: String)                                                     |
| patchValue    | 设置表单 Field 的值为指定值                   | func(data: Object)                                                     |
| resetValue    | 把所有 Field 的值恢复到指定值或初始状态       | func(data: Object)                                                     |
| initialize    | 设置表单 Field 初始值                         | func(data: Object)                                                     |
| isValid       | 表单的所有 Field 是否都通过了校验             | func                                                                   |
| isValidating  | 表单是否有 Field 在异步校验                   | func                                                                   |
| validate      | 对表单进行校验                                | func(forceValidate: Boolean, callback: Function, relatedFields: Array) |

#### **`useField`**

所有需要维护 `value` 的表单元素组件都需要通过 `Field` 组件包装一下。
在 `Field` 组件上可以传入以下 props ，`component` 以外的其他 props （包括自定义的 props ），都会传入到 `component` 中所定义的表单元素组件中：

| 参数 | 说明       | 类型   | 是否必填 |
| ---- | ---------- | ------ | -------- |
| name | 表单元素名 | string | 是       |

#### **`FieldSet`**

`FormSection` 提供以下参数：

| 参数     | 说明           | 默认值 | 是否必填                                                  |
| -------- | -------------- | ------ | --------------------------------------------------------- |
| name     | 表单块的名字   | 无     | 当 FormStrategy 是 View 时必填                            |
| model    | 表单块的数据   | 无     | 当 FormStrategy 是 Model 时或者是 FieldArray 一部分时必填 |
| children | 表单块的子元素 | 无     | 否                                                        |

#### **`useFieldArray`**

`FieldArray` 组件支持如下：

| 参数      | 说明                                                                               | 类型                     | 是否必填 |
| --------- | ---------------------------------------------------------------------------------- | ------------------------ | -------- |
| name      | `FieldArray` 的名字                                                                | string                   | 是       |
| value     | 组件的值                                                                           | array                    | 否       |
| component | `FieldArray` 中展示的表单元素组件，可以是字符串(标准 html 元素名), 或者 React 组件 | string / React.Component | 是       |

`FieldArray` 会为其 `component` 注入 `fields` 属性并提供表单域数组的遍历、增加、删除等功能，其 API 如下所示：

| 参数      | 说明                                                                               | 类型                                    |
| --------- | ---------------------------------------------------------------------------------- | --------------------------------------- |
| name      | `FieldArray` 的名字                                                                | string                                  |
| map       | 遍历 `FieldArray` 中表单域数组                                                     | (callback: Function) => any             |
| move      | 移动 `FieldArray` 中表单域数组的某一项                                             | (fromPos: Number, toPos: Number) => any |
| pop       | 删除 `FieldArray` 中表单域数组的最后一项                                           | func                                    |
| push      | 在 `FieldArray` 中表单域数组末尾添加一项                                           | (value: Object/String) => any           |
| remove    | 删除 `FieldArray` 中表单域数组中的某一项                                           | (index: Number) => any                  |
| removeAll | 删除 `FieldArray` 中整个表单域数组                                                 | func                                    |
| shift     | 删除 `FieldArray` 中表单域数组的第一项                                             | func                                    |
| swap      | 交换 `FieldArray` 中表单域数组的某两项                                             | (indexA: Number, indexB: Number) => any |
| unshift   | 在 `FieldArray` 中表单域数组的头部添加一项                                         | (value: Object/String) => any           |
| concat    | 在 `FieldArray` 中表单域数组末尾连接一个数组, 如果传入的不是数组，则会被添加到末尾 | (value: Object/String/Array) => any     |

⚠️ 注意：遍历的回调函数 callback 将接受五个参数: item（`FieldArray` 中当前项的名字），index（`FieldArray` 中当前项的次序），key（`FieldArray` 中当前项的唯一 key 值），value（`FieldArray` 中当前项的值）， fieldsValue（`FieldArray` 的所有值）。为了保证 `FieldArray` 在删除和添加时数据正确，遍历时一定要给 `component` 中的子节点设置正确的 `name` 和 `key`, 详见使用参考 [FieldArray 基本使用](#fieldarray-zu-jian)

#### **内置的 Validator**

可以直接在 `Field` 的 `validations` 属性中使用，使用方法参考 [demo 常用表单校验](#biao-dan-xiao-yan-de-shi-yong)。内置规则如下：

| 规则名       | 说明                             |
| ------------ | -------------------------------- |
| required     | 不是 null，不是空数组或空字符串  |
| min          | 最小值                           |
| max          | 最大值                           |
| requiredTrue | 必须是 true                      |
| email        | 邮件地址                         |
| minLength    | 任意有 length 属性的对象最小长度 |
| maxLength    | 任意有 length 属性的对象最小长度 |
| pattern      | 匹配正则表达式                   |

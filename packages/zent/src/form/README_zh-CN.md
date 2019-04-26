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

<!-- demo-slot-4 -->

### 表单校验

#### 表单校验的使用

- `Field` 组件支持传入 `validations` 和 `validationErrors` 来指定校验规则和校验提示；
- `validations` 对象支持预置的内部校验规则（详见[内置 validation rules](#nei-zhi-validation-rules) ）, 也支持传入自定义的校验函数，详见下面一小节；
- 可以通过 `Form.createForm` 扩展内部校验规则，详见 [`Form.createForm` API](#form-createform) 。
- 默认在任一表单进行校验时，其他所有表单域都会进行校验。如果想修改这种默认行为，可以给 `Field` 的 `relatedFields` 属性为一组表单域的名字数组，这样当当前表单域校验时，只会校验这些指定的表单域。

自定义表单校验函数定义:

`function validate(formValues, fieldValue): string | boolean`

- 如果返回 `boolean`，`true` 表示校验通过，`false` 表示校验失败，此时需要配合 `validationErrors` 里面相同 key 的错误描述一起使用。
- 也可以直接在自定义校验函数里直接返回 `string` 类型的错误描述，此时不需要传对应的 `validationErrors`。

<!-- demo-slot-5 -->

#### 表单校验时机

表单的默认校验时机是 value 值改变的时候。可以修改 `validateOnChange`，`validateOnBlur` 来改变校验时机，如在 blur 时再校验（一般用于 Input 输入框）。

如果你需要在提交时校验表单项，可以设置 `validateOnChange`，`validateOnBlur` 都为 `false`，并使用内置表单提交操作 `handleSubmit`。如果不使用 `handleSubmit` 处理表单提交操作，你需要在表单提交时使用 `zentForm.validateForm(true, callback)` 方法强制触发表单的校验，并在 `callback` 中处理后续逻辑。如果需要自主控制错误信息的展示，可以使用 `Field` 的 `displayError` 属性来控制错误信息的显示。

<!-- demo-slot-6 -->

#### 异步校验

异步校验在 blur 时触发，如果需要在自定义组件中手动触发异步校验，需要自己调用`props.onBlur(event)`。 `value` 值可以直接传给 `event` ，或者作为 `event` 的属性传入。

如果在没有触发异步校验的情况下（比如没有对表单项进行过操作）直接提交表单时，默认不会触发异步校验，使用内置的 `handleSubmit` 方法可以在提交表单时触发从未进行的异步校验。如果不使用 `handleSubmit` 处理表单提交操作，你需要在表单提交时使用 `zentForm.isFormAsyncValidated` 判断表单是否经过了异步校验，并根据结果选择是否使用 `zentForm.asyncValidateForm(resolve, reject)` 方法强制触发表单的异步校验。

<!-- demo-slot-7 -->

### 其他

#### `Form` 布局

`Form` 组件使用`flex`布局，提供两种简单的样式：水平布局 `horizontal`， 垂直布局 `vertical`。

<!-- demo-slot-11 -->

#### `FieldSet` 组件

<!-- demo-slot-12 -->

#### `FieldArray`

<!-- demo-slot-14 -->

### 组件原理

本组件核心由以下几部分组成：

- `createForm` 函数：用来构建一个高阶组件，其中维护了表单中的所有表单元素（`Field` 组件）实例。通过向子组件的 `props` 中注入 `zentForm` 属性来提供表单和表单元素的各种操作方法。
- `Form` 组件：作为整个表单的最顶层骨架，是对 `<form>` 标签的简单封装，定义了默认的 class 来提供基础样式。
- `Field` 组件：用来封装各种表单元素组件（如 `Input` 、 `Checkbox` 、`Select` 以及各种自定义组件）的一个高阶组件。其中维护了表单元素 value 值和校验错误等信息。Field 组件会向表单元素组件传入封装过的 `onChange` 、`onBlur` 回调和 `value` 、`error` 等表单元素需要的 props 。

具体的使用，详见 [API 说明](#api)。

### 其他说明

#### 封装自定义的表单元素组件

### API

#### **`Form`**

对 html 中 form 元素的一个简单封装, 提供默认的 className。除了 form 元素本身的属性外，还提供以下属性。当 onSubmit 没有传入时，默认会将 submit 事件 `preventDefault`。

| 参数   | 说明       | 类型                        | 默认值   | 是否必填 |
| ------ | ---------- | --------------------------- | -------- | -------- |
| prefix | 自定义前缀 | string                      | `'zent'` | 否       |
| type   | 布局类型   | `'vertical' | 'horizontal'` |          |          |

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
| isSubmitting  | 表单是否正在提交                              | func                                                                   |
| isValidating  | 表单是否有 Field 在异步校验                   | func                                                                   |
| isFieldDirty  | Field 是否变更过值                            | func(name: String)                                                     |
| validateForm  | 强制表单进行同步校验                          | func(forceValidate: Boolean, callback: Function, relatedFields: Array) |

#### **`useField`**

所有需要维护 `value` 的表单元素组件都需要通过 `Field` 组件包装一下。
在 `Field` 组件上可以传入以下 props ，`component` 以外的其他 props （包括自定义的 props ），都会传入到 `component` 中所定义的表单元素组件中：

| 参数 | 说明       | 类型   | 是否必填 |
| ---- | ---------- | ------ | -------- |
| name | 表单元素名 | string | 是       |

除了上述参数之外， `Field` 组件会隐含地向被包裹的表单元素组件中传入以下 props ：

| 参数     | 说明                                         | 类型          |
| -------- | -------------------------------------------- | ------------- |
| isDirty  | 表单元素值被改变过                           | boolean       |
| isActive | 表单元素为 input 且获得了焦点                | boolean       |
| error    | 第一个校验错误文本信息（没有报错时为 null ） | string / Null |
| errors   | 校验错误文本信息数组（没有错误时为空数组）   | array         |

#### **`FieldSet`**

`FormSection` 提供以下参数：

| 参数      | 说明                            | 类型                     | 默认值  | 是否必填 |
| --------- | ------------------------------- | ------------------------ | ------- | -------- |
| name      | 表单块的名字                    | string                   | 无      | 是       |
| component | 包裹 `FormSection` 的 html 标签 | string                   | `'div'` | 否       |
| children  | 表单块的子元素                  | string / React.Component | 无      | 否       |

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

| 规则名      | 说明                         | 可传参数                                             |
| ----------- | ---------------------------- | ---------------------------------------------------- |
| required    | 是否必填                     | 任意，传 true 是为了表意，传其他值也是当作必填，下同 |
| isExisty    | 是否非 null ，非 undefined   | 任意                                                 |
| matchRegex  | 是否匹配指定正则表达式       | Regex                                                |
| isEmail     | 是否邮件类型字符串           | 任意                                                 |
| isUrl       | 是否 url 类型                | 任意                                                 |
| isTrue      | 是否 true                    | 任意                                                 |
| isFalse     | 是否 false                   | 任意                                                 |
| isNumeric   | 是否数字类型                 | 任意                                                 |
| isInt       | 是否整数                     | 任意                                                 |
| isFloat     | 是否小数                     | 任意                                                 |
| isLength    | 字符串或数组是否为指定长度   | 长度值(Number)                                       |
| equals      | 是否与指定值相等             | 指定值                                               |
| equalsField | 是否与表单中的其他元素值相等 | 其他 Field 的 name(String)                           |
| maxLength   | 字符串或数组不能超过指定长度 | 长度值(Number)                                       |
| minLength   | 字符串或数组不能小于指定长度 | 长度值(Number)                                       | --> |

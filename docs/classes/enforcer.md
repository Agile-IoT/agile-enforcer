[agile-enforcer](../README.md) > [Enforcer](../classes/enforcer.md)

# Class: Enforcer

## Hierarchy

**Enforcer**

## Index

### Constructors

* [constructor](enforcer.md#constructor)

### Properties

* [apiSchema](enforcer.md#apischema)
* [config](enforcer.md#config)

### Methods

* [authorize](enforcer.md#authorize)
* [extractOptions](enforcer.md#extractoptions)

---

## Constructors

<a id="constructor"></a>

###  constructor

⊕ **new Enforcer**(apiSchema: *`any`*, config: *`any`*): [Enforcer](enforcer.md)

*Defined in [enforcer/index.ts:36](https://github.com/Agile-IoT/agile-enforcer/blob/f8a653a/lib/enforcer/index.ts#L36)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| apiSchema | `any` |
| config | `any` |

**Returns:** [Enforcer](enforcer.md)

___

## Properties

<a id="apischema"></a>

###  apiSchema

**● apiSchema**: *`any`*

*Defined in [enforcer/index.ts:35](https://github.com/Agile-IoT/agile-enforcer/blob/f8a653a/lib/enforcer/index.ts#L35)*

___
<a id="config"></a>

###  config

**● config**: *`any`*

*Defined in [enforcer/index.ts:36](https://github.com/Agile-IoT/agile-enforcer/blob/f8a653a/lib/enforcer/index.ts#L36)*

___

## Methods

<a id="authorize"></a>

###  authorize

▸ **authorize**(options: *[EnforcerOptions](../interfaces/enforceroptions.md)*): `Promise`<`boolean`>

*Defined in [enforcer/index.ts:43](https://github.com/Agile-IoT/agile-enforcer/blob/f8a653a/lib/enforcer/index.ts#L43)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| options | [EnforcerOptions](../interfaces/enforceroptions.md) |

**Returns:** `Promise`<`boolean`>

___
<a id="extractoptions"></a>

### `<Static>` extractOptions

▸ **extractOptions**(reqMethod: *`string`*, reqPath: *`string`*): `(Anonymous function)`

*Defined in [enforcer/index.ts:115](https://github.com/Agile-IoT/agile-enforcer/blob/f8a653a/lib/enforcer/index.ts#L115)*

**Parameters:**

| Param | Type |
| ------ | ------ |
| reqMethod | `string` |
| reqPath | `string` |

**Returns:** `(Anonymous function)`

___


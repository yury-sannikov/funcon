# mocha-fonteva-adapters

mocha-fonteva-adapters is a set of adapters to help unit test Salesforce Aura components with Fonteva Framework components using [mocha-aura](https://www.npmjs.com/package/mocha-aura)

## Why?
Fonteva Framework components have variety of methods. They are widely used by any Fonteva product. Most of the controller and helper methods expect aura component to have those methods. `mocha-fonteva-adapters` hooks [mocha-aura](https://www.npmjs.com/package/mocha-aura) component creation logic and add those methods to mock components.
By extending components with Framework methods, tests writers will not worry about registering all used methods in a spec and reduce boilerplate code.


Salesforce Aura components controller and helper files does not export anything and can not be directly required by nodejs. `mocha-aura` modifies standard nodejs loader for Salesforce Aura components and exports containing object.

## Installation

```
yarn add mocha-fonteva-adapters
```

## Usage

```
const { componentFactory, useComponentAdapters } = require('mocha-aura/lib/componentFactory')
const { frameworkAdapters } = require('mocha-fonteva-adapters');
...
  before(function() {
    useComponentAdapters(frameworkAdapters);
...
```

# mocha-fonteva-data-generator

mocha-fonteva-data-generator is a library to generate test data for Fonteva UI tests. It integrates with Mocha and inject generated data straight into test function.

## Installation
Add `"mocha-fonteva-data-generator": "git+ssh://git@github.com:Fonteva/mocha-fonteva-data-generator.git#0.1.0",` line to the package.json and do `yarn install`

## Set up

Import `useDataGenerators` registration function and all necessary generators:
```
const { useDataGenerators, LTEAttendee, LTESpeaker } = require('mocha-fonteva-data-generator')
```

Then call `useDataGenerators();` before first `describe` call in your test.

## Usage
`it.generate` function is used to generate mock objects and inject it into test function passed as a last argument.

Firs argument is a test description like regular `it()` function. Test description can have %s placefolder to convert every injected value to it's string representation.

Second argument is a number of invokes of a test function. Each call will be made with different data set.

Third argument is an array of items to be injected into the test function. Test function should have equal amount of parameters with array lengh for synchronous test function. You can add one more parameter to the test function which made test function asynchronous function. You have to have call that callback function when your test finishes.

### Array of items to inject

Simple form: `[LTEAttendee]`
Will inject a LTEAttendee instance to the first argument of test function

Multi Instances: `[LTEAttendee, LTESpeaker]`
Will inject a LTEAttendee instance to the first argument and LTESpeaker to the second argument

With Parameters: `[LTEAttendee({fixed: {email: 'myemail.com', formId: 5}})]`
Will generate and ingect LTEAttendee instance with fixed email and formId.

Array of speakers: `[LTEAttendee, [LTESpeaker]]`
Test function will be called with an instance of LTEAttendee and an array of LTESpeaker objects in a second argument.

Define array length: `[LTEAttendee, [LTESpeaker, 3]]`
Test function will be called with an instance of LTEAttendee and an array of 3 LTESpeaker objects in a second argument.

Define array length: `[LTEAttendee, [LTESpeaker, 3, 8]]`
Test function will be called with an instance of LTEAttendee and an array of LTESpeaker with random length between 3 and 8 in a second argument.

## Examples

### Inject Simple Value
```
it.generate('should check against %s object',
   5, [LTEAttendee], (attendeeObj) =>  {
  expect(attendeeObj.id).not.empty
}
```

### Inject Simple Values
```
it.generate('should check against %s and %s objects',
   5, [LTEAttendee, LTESpeaker], (attendeeObj, speakerObj) =>  {
  expect(attendeeObj.id).not.empty
  expect(speakerObj.id).not.empty
}
```

### Inject Simple Value with fixed items
```
it.generate('should check against %s and %s objects',
   5, [LTEAttendee({fixed: {formId: 5}})], (attendeeObj) =>  {
  expect(attendeeObj.id).not.empty
  expect(attendeeObj.formId).to.equal(5)
}
```

### Inject Array of Objects
```
it.generate('should check against %s and %s objects',
   5, [LTEAttendee, [LTESpeaker]], (attendeeObj, speakerArr) =>  {
  expect(attendeeObj.id).not.empty
  expect(speakerArr).is.array
}
```

### Inject Array of Objects with fixed length
```
it.generate('should check against %s and %s objects',
   5, [LTEAttendee, [LTESpeaker, 3]], (attendeeObj, speakerArr) =>  {
  expect(attendeeObj.id).not.empty
  expect(speakerArr).is.array
  expect(speakerArr.length).to.equal(3)
}
```

### Inject Array of Objects with length restrictions
```
it.generate('should check against %s and %s objects',
   5, [LTEAttendee, [LTESpeaker, 3, 8]], (attendeeObj, speakerArr) =>  {
  expect(attendeeObj.id).not.empty
  expect(speakerArr).is.array
  expect(speakerArr.length).to.gte(3)
  expect(speakerArr.length).to.lte(8)
}
```

### Inject Array of Objects with length restrictions and fixed elements
```
it.generate('should check against %s and %s objects',
   5, [LTEAttendee, [LTESpeaker({fixed: {isFeature: true}}), 3, 8]], (attendeeObj, speakerArr) =>  {
  expect(attendeeObj.id).not.empty
  expect(speakerArr).is.array
  expect(speakerArr.length).to.gte(3)
  expect(speakerArr.length).to.lte(8)
  expect(speakerArr.every(e => e.isFeature === true)).is.true
}
```

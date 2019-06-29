[![Build Status](https://travis-ci.org/pelevesque/has_prohibited_substring_at_indexes.svg?branch=master)](https://travis-ci.org/pelevesque/has_prohibited_substring_at_indexes)
[![Coverage Status](https://coveralls.io/repos/github/pelevesque/has_prohibited_substring_at_indexes/badge.svg?branch=master)](https://coveralls.io/github/pelevesque/has_prohibited_substring_at_indexes?branch=master)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

# has_prohibited_substring_at_indexes

Checks if a string has at least one prohibited substring at a given index.

## Node Repository

https://www.npmjs.com/package/@pelevesque/has_prohibited_substring_at_indexes

## Installation

`npm install @pelevesque/has_prohibited_substring_at_indexes`

## Tests

### Standard Style & Unit Tests

`npm test`

### Unit Tests & Coverage

`npm run cover`

## Usage

### Requiring

```js
const hasProhibitedSubstringAtIndexes = require('@pelevesque/has_prohibited_substring_at_indexes')
```

### Basic Usage

`prohibitedSubstrings` is an object of index -> substring pairs. `true` is returned
if at least one substring is found at the correct index.

```js
const str = 'abcde'
const prohibitedSubstrings = { 0: 'e' }
const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
// result === false
```

```js
const str = 'abcde'
const prohibitedSubstrings = { 0: '!', 2: 'c', 4: '!' }
const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
// result === true
```

```js
const str = 'a man a plan a canal'
const prohibitedSubstrings = { 2: 'man', 8: 'plan', 15: 'canal' }
const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
// result === true
```

### AllowSubstringBleeding Flag

The `allowSubstringBleeding` flag is `false` by default. It it used when you want
to allow the last substring to be incomplete if the string is too short.
In the following example, the last substring `canal` starts at the right index,
but remains incomplete since the string ends. Normally this would return `false`.
With `allowSubstringBleeding` set to `true`, it returns `true`.

```js
const str = 'a man a plan a c'
const prohibitedSubstrings = { 15: 'canal' }
const allowSubstringBleeding = true
const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings, allowSubstringBleeding)
// result === true
```

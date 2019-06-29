/* global describe, it */
'use strict'

const expect = require('chai').expect
const hasProhibitedSubstringAtIndexes = require('../index')

describe('#hasProhibitedSubstringAtIndexes()', () => {
  describe('value check', () => {
    it('should return false when prohibitedSubstrings is an empty object', () => {
      const str = ''
      const prohibitedSubstrings = {}
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return false when str is empty and some prohibited substrings are defined', () => {
      const str = ''
      const prohibitedSubstrings = { 0: 'a' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })
  })

  describe('single character substrings', () => {
    it('should return false when one substring is not found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 2: 'a' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when one substring is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 2: 'c' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when many substrings are not found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'e', 2: 'f', 4: 'a' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when at least one substring is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'e', 2: 'c', 4: 'a' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return true when many substrings are found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'a', 2: 'c', 4: 'e' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('multi character substrings', () => {
    it('should return false when one substring is not found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 2: 'abc' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when one substring is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 2: 'cde' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when many substrings are not found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'edc', 2: 'abc', 4: 'abc' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when at least one substring is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'edc', 2: 'cde', 4: 'abc' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return true when many substrings are found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'abc', 2: 'cde', 4: 'e' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('allowSubstringBleeding flag', () => {
    it('should not allow bleeding when set to false', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 4: 'efg' }
      const allowSubstringBleeding = false
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings, allowSubstringBleeding)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should allow bleeding when set to true', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 4: 'efg' }
      const allowSubstringBleeding = true
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings, allowSubstringBleeding)
      const expected = true
      expect(result).to.equal(expected)
    })
  })
})

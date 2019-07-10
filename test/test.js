/* global describe, it */
'use strict'

const expect = require('chai').expect
const hasProhibitedSubstringAtIndexes = require('../index')

describe('#hasProhibitedSubstringAtIndexes()', () => {
  describe('empty argument checks', () => {
    it('should return false when prohibitedSubstrings is an empty object', () => {
      const str = 'abcde'
      const prohibitedSubstrings = {}
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return false when str is empty', () => {
      const str = ''
      const prohibitedSubstrings = { 0: 'a', 1: 'b', 2: 'c' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })
  })

  describe('single character substrings', () => {
    it('should return false when one of one substring is not found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 2: 'a' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when one of one substring is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 2: 'c' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when none of many substrings are found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'e', 2: 'f', 4: 'a' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when at least one of many substrings is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'e', 2: 'c', 4: 'a' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return true when all of many substrings are found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'a', 2: 'c', 4: 'e' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('multi character substrings', () => {
    it('should return false when one of one substring is not found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 2: 'abc' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when one of one substring is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 2: 'cde' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return false when none of many substrings are found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'edc', 2: 'abc', 4: 'abc' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when at least one of many substrings is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'edc', 2: 'cde', 4: 'abc' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })

    it('should return true when all of many substrings are found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: 'abc', 2: 'cde', 4: 'e' }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('many substrings at one index', () => {
    it('should return false when none of many substrings are found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: ['bee', 'pig', 'man'], 2: ['hog', 'fly'] }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    it('should return true when at least one of many substrings is found', () => {
      const str = 'abcde'
      const prohibitedSubstrings = { 0: ['bee', 'pig', 'man'], 2: ['hog', 'cde', 'fly'] }
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = true
      expect(result).to.equal(expected)
    })
  })

  describe('allowLastSubstringToBleed option', () => {
    it('should default to false', () => {
      const str = 'a big ma'
      const prohibitedSubstrings = ['machine']
      const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings)
      const expected = false
      expect(result).to.equal(expected)
    })

    describe('classic argument style', () => {
      it('should not allow last substring to bleed when set to false', () => {
        const str = 'abcde'
        const prohibitedSubstrings = { 4: 'efg' }
        const allowLastSubstringToBleed = false
        const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings, allowLastSubstringToBleed)
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow last substring to bleed when set to true', () => {
        const str = 'abcde'
        const prohibitedSubstrings = { 4: 'efg' }
        const allowLastSubstringToBleed = true
        const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings, allowLastSubstringToBleed)
        const expected = true
        expect(result).to.equal(expected)
      })
    })

    describe('options style', () => {
      it('should not allow last substring to bleed when set to false', () => {
        const str = 'abcde'
        const prohibitedSubstrings = { 4: 'efg' }
        const allowLastSubstringToBleed = false
        const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings, {
          allowLastSubstringToBleed: allowLastSubstringToBleed
        })
        const expected = false
        expect(result).to.equal(expected)
      })

      it('should allow last substring to bleed when set to true', () => {
        const str = 'abcde'
        const prohibitedSubstrings = { 4: 'efg' }
        const allowLastSubstringToBleed = true
        const result = hasProhibitedSubstringAtIndexes(str, prohibitedSubstrings, {
          allowLastSubstringToBleed: allowLastSubstringToBleed
        })
        const expected = true
        expect(result).to.equal(expected)
      })
    })
  })
})

'use strict'

module.exports = (str, prohibitedSubstrings, allowSubstringBleeding = false) => {
  prohibitedSubstrings = Object.entries(prohibitedSubstrings)
  if (prohibitedSubstrings.length === 0) return false
  if (prohibitedSubstrings.length > 0 && str === '') return false
  let hasProhibitedSubstring = false
  for (let i = 0, len = prohibitedSubstrings.length; i < len; i++) {
    const index = prohibitedSubstrings[i][0]
    let substring = prohibitedSubstrings[i][1]
    if (allowSubstringBleeding) {
      const substringMaxLength = str.length - index
      if (substring.length > substringMaxLength) {
        substring = substring.substr(0, substringMaxLength)
      }
    }
    const target = str.substr(index, substring.length)
    if (substring.localeCompare(target) === 0) {
      hasProhibitedSubstring = true
      break
    }
  }
  return hasProhibitedSubstring
}

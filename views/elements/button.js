'use strict'

var bel = require('bel')

module.exports = function createButton (text) {
  return bel`<button type="submit">${text}</button>`
}

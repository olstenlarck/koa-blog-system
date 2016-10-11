'use strict'

var bel = require('bel')

module.exports = function createInput (name, type, noHuman) {
  var human = name.charAt(0).toUpperCase() + name.slice(1)
  return noHuman
    ? bel`<input type="${type || 'text'}" name="${name}"/>`
    : bel`<p>${human}: <input type="${type || 'text'}" name="${name}"></p>`
}

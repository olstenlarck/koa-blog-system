'use strict'

var bel = require('bel')

module.exports = function list (items, li) {
  return bel`<ul>${items.map(li)}</ul>`
}

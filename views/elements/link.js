'use strict'

var bel = require('bel')

module.exports = function link (href, title) {
  return bel`<a href="${href}">${title}</a>`
}

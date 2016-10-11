'use strict'

var bel = require('bel')
var input = require('./input')
var button = require('./button')

module.exports = function createForm (action, buttonText, inputs, raw) {
  return bel`<form action="${action}" method="post" enctype="multipart/form-data">
    ${raw ? inputs.map((el) => {
      return el
    }) : inputs.map((name) => {
      return input(name)
    })}
    ${button(buttonText)}
  </form>`
}

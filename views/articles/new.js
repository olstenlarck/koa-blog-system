'use strict'

var bel = require('bel')
var layout = require('../layouts/default')
var form = require('../elements/form')
var input = require('../elements/input')
var button = require('../elements/button')
var extend = require('extend-shallow')

module.exports = function new_ (state) {
  state = extend({}, state, {
    title: state.pages.new.title,
    body: bel`<section>
    <h1>${state.pages.new.title}</h1>
    <p>${state.pages.new.descr}</p>
    ${form('/create', 'Publish article', [
      // 'title', 'descr'
      input('title'),
      input('descr'),
      input('image', 'file')
    ], true)}</section>`
  })
  return bel`${layout(state)}`
}

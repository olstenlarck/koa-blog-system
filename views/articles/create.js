'use strict'

var bel = require('bel')
var layout = require('../layouts/default')
var link = require('../elements/link')
var extend = require('extend-shallow')

module.exports = function new_ (state) {
  var title = state.isError ? 'Creating article fails' : 'Article published'
  var href = `/details/${state.id}` // if success

  state = extend({}, state, {
    title: title,
    body: bel`<section>
      <h1>${title}</h1>
      <p>${state.message}</p>
      ${state.isError ? link('/create', 'Try again') : link(href, 'Go see it')}
    </section>`
  })
  return bel`${layout(state)}`
}

'use strict'

var bel = require('bel')
var layout = require('../layouts/default')
var link = require('../elements/link')
var list = require('../elements/list')
var extend = require('extend-shallow')

module.exports = function index (state) {
  state = extend({}, state, {
    title: state.pages.index.title,
    body: bel`<section>
      <h1>${state.pages.index.title}</h1>
      <p>${state.pages.index.descr}</p>
      ${state.articles.length ? list(state.articles, (article) => {
        var href = `/details/${article.id}`
        return bel`<li>${article.id}. ${link(href, article.title)} / ${article.date}</li>`
      }) : 'List is empty... Go create article.'}
    </section>`
  })
  return bel`${layout(state)}`
}

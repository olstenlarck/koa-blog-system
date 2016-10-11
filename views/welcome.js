'use strict'

var bel = require('bel')
var layout = require('./layouts/default')
var list = require('./elements/list')
var link = require('./elements/link')
var extend = require('extend-shallow')

module.exports = function welcome_ (state) {
  state = extend({}, state, {
    title: state.pages.welcome.title,
    body: bel`<section>
      <h1>${state.pages.welcome.title}</h1>
      <p>${state.pages.welcome.descr}</p>
      <hr>
      ${state.articles.length ? list(state.articles, (article) => {
        var href = `/details/${article.id}`
        return bel`<li>${article.id}. ${link(href, article.title)} / ${article.date}</li>`
      }) : 'List is empty... Go create article.'}
    </section>`
  })
  return bel`${layout(state)}`
}

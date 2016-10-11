'use strict'

var bel = require('bel')
var layout = require('../layouts/default')
var form = require('../elements/form')
var list = require('../elements/list')
var extend = require('extend-shallow')

module.exports = function new_ (state) {
  state = extend({}, state, {
    title: state.article.title,
    body: bel`<section>
      <h1>${state.article.title} (views: ${state.article.views})</h1>
      ${state.article.img ? bel`<p><img src="/images/${state.article.img}"></p>` : ''}
      <p>${state.article.descr}</p>
      <h2>Wanna comment?</h2>
      ${form(`/details/${state.article.id}/comment`, 'Post a comment', ['username', 'text'])}
      <hr>
      <h2>Comments (${state.comments.length})</h2>
      ${state.comments.length ? list(state.comments, (comment) => {
        return bel`<div>
          <p><strong>${comment.username}</strong>: ${comment.text}</p>
          <p>${comment.date}</p>
          <hr>
        </div>`
      }) : `There's no comments, yet. Write the first one :)`}
    </section>`
  })
  return bel`${layout(state)}`
}

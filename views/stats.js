'use strict'

var bel = require('bel')
var admin = require('./layouts/admin')
var input = require('./elements/input')
var list = require('./elements/list')
var form = require('./elements/form')
var link = require('./elements/link')
var extend = require('extend-shallow')

module.exports = function stats (state) {
  var views = `Views: ${state.totalViews}`
  var comments = `Comments: ${state.totalComments}`
  var posts = `Articles: ${state.articles.length}`

  state = extend({}, state, {
    title: 'Admin Panel Stats',
    body: bel`<section>
      ${state.articles.length ? list(state.articles, (article) => {
        var href = `/details/${article.id}`
        var del = article.deleted === false ? 'delete' : 'un-delete'
        var action = `/details/${article.id}/update`
        var updateForm = form(action, del, [
          input('deleted', 'hidden', true)
        ], true)
        var views = `Views: ${article.views}`
        var comments = `Comments: ${article.comments.length}`

        return bel`<li>${article.id}. ${link(href, article.title)} / ${views} / ${comments} / ${updateForm}</li>`
      }) : 'No articles'}
      <hr>
      ${state.articles.length ? `Total: ${views} / ${posts} / ${comments}` : ''}
      <h1>Do you want to clear the store? ${link('/delete-all', 'click if you want')}</h1>
    </section>
    `
  })
  return bel`${admin(state)}`
}

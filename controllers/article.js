/*!
 * koa-blog-system <https://github.com/tunnckoCore/koa-blog-system>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

// GET /
exports.welcome = function * welcome_ (next) {
  var articles = []
  var data = this.store.data
  var keys = Object.keys(data).reverse()
  var len = keys.length
  var i = 0

  while (i < len) {
    var id = keys[i]
    var article = data[id]
    if (i < this.data.latest) articles.push(article)
    i++
  }
  articles = articles.sort(function(a, b) {
    return b.views - a.views
  })

  this.render('welcome', this.config({
    articles: articles
  }))
}

// GET /all
exports.index = function * index_ (next) {
  var articles = []
  Object.keys(this.store.data).reverse().forEach(function (id) {
    var article = this.store.data[id]
    if (article.deleted === false) articles.push(this.store.data[id])
  }, this)

  this.render('articles/index', this.config({
    articles: articles
  }))
}

// GET /create
exports.new = function * new_ (next) {
  this.render('articles/new', this.data)
}

// POST /create
exports.create = function * create_ (next) {
  var message = 'Successfully created article!'
  var isError = false
  var fields = this.request.fields
  var files = this.request.files
  var image = files && files.length
    ? files[0].path.replace(/^images\//, '')
    : null

  if (!fields.title.length || !fields.descr.length) {
    isError = true
    message = 'Title and description are required.'
  }
  if (!isError) {
    var id = Object.keys(this.store.data).length + 1
    this.store.set(String(id), {
      id: id,
      title: fields.title,
      descr: fields.descr,
      deleted: false,
      date: new Date(),
      views: 0,
      comments: [],
      img: image
    })
    this.store.save()
  }

  this.render('articles/create', this.config({
    id: id,
    fields: fields,
    isError: isError,
    message: message
  }))
}

// GET /details/:id
exports.show = function * show_ (next) {
  var id = this.params.id
  var article = this.store.data[id]
  article.views = article.views + 1
  this.store.data[id].views = article.views
  this.store.save()
  this.render('articles/show', this.config({
    article: article,
    comments: article.comments
  }))
}

exports.stats = function * stats_ (next) {
  if (this.get('My-Authorization') !== 'Admin') {
    this.status = 403
    this.body = ' 403 Forbidden'
    return yield next
  }

  var articles = []
  var data = this.store.data
  var keys = Object.keys(data).reverse()
  var len = keys.length
  var i = 0
  var totalViews = 0
  var totalComments = 0

  while (i < len) {
    var id = keys[i]
    var article = data[id]
    totalViews += article.views
    totalComments += article.comments.length
    articles.push(article)
    i++
  }

  this.render('stats', this.config({
    articles: articles,
    totalViews: totalViews,
    totalComments: totalComments
  }))
}

// in REST principles it should be `/details/:id/edit`
// POST /details/:id/comment
exports.comment = function * comment_ (next) {
  var article_id = String(this.params.id)
  var message = 'You post a comment!'
  var isError = false
  var fields = this.request.fields

  if (!fields.username.length || !fields.text.length) {
    isError = true
    message = 'Username and text are required.'
  }
  if (!isError) {
    var id = this.store.data[article_id].comments.length + 1
    this.store.data[article_id].comments.push({
      id: id,
      username: fields.username,
      text: fields.text,
      date: new Date(),
    })
    this.store.save()
  }

  this.render('articles/comment', this.config({
    id: article_id,
    isError: isError,
    message: message
  }))
}

// POST /details/:id/update
// delete/un-delete article
exports.update = function * update_ (next) {

}

// GET /delete-all - comes from authenticated `/stats`
exports.delAll = function * delAll_ (next) {
  this.store.clear()
  yield next
}

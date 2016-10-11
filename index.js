/*!
 * koa-blog-system <https://github.com/tunnckoCore/koa-blog-system>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

var Koa = require('koa')
var views = require('koa-bel')
var app = new Koa()

var body = require('koa-better-body')
var extend = require('extend-shallow')
var router = require('koa-router')()
var serve = require('./test')
var store = require('data-store')('articles', {cwd: process.cwd()})
var artcileCtrl = require('./controllers/article')

app
  .use(serve('./images', '/images'))
  .use(views('./views'))
  .use(body({
    uploadDir: './images'
  }))

  /**
   * - load Databse to `ctx.store` to be able
   * to access it from each plugin and route
   * - load "config.js" which is kinda general info
   * about the site into `ctx.data`
   * - create `ctx.config(obj)` method which
   * extends `ctx.data` with `obj`
   * - patch the body
   */
  .use(function (ctx, next) {
    ctx.store = store
    ctx.data = require('./config')
    ctx.config = function config (data) {
      ctx.data = extend({}, ctx.data, data)
      return ctx.data
    }
    var body = ctx.body
    ctx.body = '<!doctype html>'
    ctx.body += body
    return next()
  })

router
  .get('/', artcileCtrl.welcome)
  .get('/all', artcileCtrl.index)
  .get('/delete-all', artcileCtrl.delAll)
  .get('/create', artcileCtrl.new)
  .post('/create', artcileCtrl.create)

  // - show article
  // - show comments
  // - show form to post comment
  .get('/details/:id', artcileCtrl.show)
  .post('/details/:id/update', artcileCtrl.update)
  .post('/details/:id/comment', artcileCtrl.comment)

  .get('/stats', artcileCtrl.stats)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(4290, function () {
  console.log('Kvack server listening on http://localhost:4290')
})

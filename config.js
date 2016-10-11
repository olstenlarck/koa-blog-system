/*!
 * koa-blog-system <https://github.com/tunnckoCore/koa-blog-system>
 *
 * Copyright (c) 2016 Charlike Mike Reagent <@tunnckoCore> (http://www.tunnckocore.tk)
 * Released under the MIT license.
 */

'use strict'

module.exports = {
  project: 'SoftUni Nodejs Restful Koa',
  latest: 6,
  menu: [
    { text: 'Home', link: '/' },
    { text: 'Create', link: '/create' },
    { text: 'List', link: '/all' }
  ],
  pages: {
    welcome: {
      title: 'Welcome Page',
      descr: 'Welcome javascripter! Here you will last 6 articles.'
    },
    index: {
      title: 'All Articles',
      descr: 'In this page you see will see all articles. Latest is on top.'
    },
    new: {
      title: 'Create an article',
      descr: 'You can create new articles from here. Also you can attach image for each article.'
    }
  }
}

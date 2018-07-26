#!/usr/bin/env node

'use strict'

const program = require('commander')
const mkdirp = require('mkdirp')
const fs = require('fs')
const _ = require('lodash')
const WPAPI = require('wpapi')

mkdirp('api/v1', err => {
  if (err) console.log(err)
})

const getAll = request => {
  return request.then(response => {
    if (!response._paging || !response._paging.next) {
      return response
    }
    // Request the next page and return both responses as one collection
    return Promise.all([response, getAll(response._paging.next)]).then(function(
      responses
    ) {
      return _.flatten(responses)
    })
  })
}

const generateJson = async (team, handbook) => {
  handbook = handbook ? handbook : 'handbook'

  const wp = new WPAPI({
    endpoint: `https://make.wordpress.org/${team}/wp-json`
  })
  wp.handobooks = wp.registerRoute('wp/v2', `/${handbook}/(?P<id>)`)

  getAll(wp.handobooks()).then(allPosts => {
    const data = []
    for (const item of allPosts) {
      data.push({
        slug: item.slug,
        link: item.link,
        modified: item.modified_gmt,
        menu_order: item.menu_order,
        parent: item.parent
      })
    }

    fs.writeFile(
      `api/v1/${team}-${handbook}.json`,
      JSON.stringify(data),
      err => {
        if (err) throw err
      }
    )
  })
}

program
  .version('1.0.0')
  .arguments('<team>')
  .description('Generate a menu JSON file for WordPress.org handbook')
  .option('--handbook <handbook>', 'Specify handbook name')
  .action((team, options) => {
    generateJson(team, options.handbook)
  })

program.parse(process.argv)

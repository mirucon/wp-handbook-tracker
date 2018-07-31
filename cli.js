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
    return Promise.all([response, getAll(response._paging.next)]).then(
      responses => _.flatten(responses)
    )
  })
}

const generateJson = async (team, handbook, subdomain) => {
  console.log(subdomain)
  handbook = handbook ? handbook : 'handbook'
  subdomain = `${
    subdomain ? (subdomain === 'w.org' ? '' : subdomain) : 'make'
  }.`

  const wp = new WPAPI({
    endpoint: `https://${subdomain}wordpress.org/${team}/wp-json`
  })
  wp.handobooks = wp.registerRoute('wp/v2', `/${handbook}/(?P<id>)`)

  getAll(wp.handobooks()).then(allPosts => {
    const data = []
    let rootPath = ''
    for (const item of allPosts) {
      if (parseInt(item.parent) === 0) {
        rootPath = item.link.split(item.slug)[0]
        break
      } else {
        rootPath = `https://${subdomain}wordpress.org/${team}/${handbook}/`
      }
    }
    for (const item of allPosts) {
      const path = item.link.split(rootPath)[1]
      data.push({
        slug: item.slug,
        id: item.id,
        link: item.link,
        path: path,
        modified: item.modified_gmt,
        menu_order: item.menu_order,
        parent: item.parent
      })
    }

    const fileName = team ? `${team}-${handbook}` : handbook

    fs.writeFile(`api/v1/${fileName}.json`, JSON.stringify(data), err => {
      if (err) throw err
    })
  })
}

program
  .version('1.0.0')
  .arguments('<team>')
  .description('Generate a menu JSON file for WordPress.org handbook')
  .option(
    '-b, --handbook <handbook>',
    'Specify handbook name (default "handbook")'
  )
  .option(
    '-s, --sub-domain <subdomain>',
    'Specify subdomain, for example, "developer" for developer.w.org, "w.org" for w.org (default "make")'
  )
  .action((team, options) => {
    generateJson(team, options.handbook, options.subDomain)
  })

program.parse(process.argv)

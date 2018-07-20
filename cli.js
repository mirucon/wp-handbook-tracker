#!/usr/bin/env node

'use strict'

const axios = require('axios')
const program = require('commander')
const mkdirp = require('mkdirp')
const fs = require('fs')

mkdirp('api/v1', err => {
  if (err) console.log(err)
})

const getTotalPages = async (team, handbook) => {
  handbook = handbook ? handbook : 'handbook'
  const res = await axios.get(
    `https://make.wordpress.org/${team}/wp-json/wp/v2/${handbook}?per_page=100`
  )
  return res.headers['x-wp-totalpages']
}

const generateJson = async (team, handbook) => {
  handbook = handbook ? handbook : 'handbook'
  const totalPages = await getTotalPages(team, handbook)
  const data = []
  for (let i = 0; i < totalPages; i++) {
    const page = i + 1
    await axios
      .get(
        `https://make.wordpress.org/${team}/wp-json/wp/v2/${handbook}?per_page=100&page=${page}`
      )
      .then(res => {
        console.log(res)
        for (const item of res.data) {
          data.push({
            slug: item.slug,
            link: item.link,
            modified: item.modified_gmt,
            menu_order: item.menu_order,
            parent: item.parent
          })
        }
      })
      .catch(e => {
        console.log(e)
      })
  }

  fs.writeFile(`api/v1/${team}-${handbook}.json`, JSON.stringify(data), err => {
    if (err) throw err
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

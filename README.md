# wp-handbook-tracker

[![Build Status](https://travis-ci.org/mirucon/handbook-tracker.svg?branch=master)](https://travis-ci.org/mirucon/handbook-tracker)
[![npm version](https://badge.fury.io/js/handbook-tracker.svg)](https://www.npmjs.com/package/wp-handbook-tracker)

## Install

```bash
$ npm i -g wp-handbook-tracker

# Or

$ yarn add wp-handbook-tracker
```

For quick run, just use `$ npx wp-handbook-tracker <team>`.

## `wp-handbook-tracker` command

```bash
$ wp-handbook-tracker <team>
```

### options

* `-b, --handbook` &lt;handbook&gt;  Specify handbook name. (Default "handbook")
* `-s, --sub-domain` &lt;sub-domain&gt; Specify subdomain name. e.g. "developer" for developer.w.org, "w.org" for w.org (Default "make")

### Example

Get Meetup Handbook

```bash
$ wp-handbook-tracker community --handbook meetup-handbook
```

Get theme developer Handbook

```bash
$ wp-handbook-tracker '' --handbook theme-handbook --sub-domain developer
```

## Schema

```json
[
  {
    "slug": "slug",
    "id": "id",
    "link": "link",
    "path": "relative_path_to_link",
    "modified": "modified_date_GMT",
    "menu_order": "menu_order",
    "parent": "parent"
  }
]
```
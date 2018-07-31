# handbook-tracker

[![Build Status](https://travis-ci.org/mirucon/handbook-tracker.svg?branch=master)](https://travis-ci.org/mirucon/handbook-tracker)

## Install

```bash
$ npm i -g https://github.com/mirucon/handbook-tracker.git
```

## `handbook-tracker` command

```bash
$ handbook-tracker <team>
```

### options

* `-b, --handbook` &lt;handbook&gt;  Specify handbook name. (Default "handbook")
* `-s, --sub-domain` &lt;sub-domain&gt; Specify subdomain name. e.g. "developer" for developer.w.org, "w.org" for w.org (Default "make")

### Example

Get Meetup Handbook

```bash
$ handbook-tracker community --handbook meetup-handbook
```

Get theme developer Handbook

```bash
$ handbook-tracker '' --handbook theme-handbook --sub-domain developer
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
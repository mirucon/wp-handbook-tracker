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

- `--handbook` &lt;handbook&gt;  Specify handbook name

### Example

Get Meetup Handbook

```bash
$ handbook-tracker community --handbook meetup-handbook
```

## Schema

```json
[
  {
    "slug": "slug",
    "link": "link",
    "modified": "modified_date_GMT",
    "menu_order": "menu_order",
    "parent": "parent"
  }
]
```
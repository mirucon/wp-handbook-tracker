# handbook-tracker

## `handbook` command

```bash
$ handbook <team>
```

### options

- `--handbook` &lt;handbook&gt;  Specify handbook name

### Example

Get Meetup Handbook

```bash
$ handbook community --handbook meetup-handbook 
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

# Tags

## `GET /api/tags/:tag`

Recent tracks for a given tag.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

### Example

```
GET /api/tags/indie
GET /api/tags/emo
GET /api/tags/alternative%20rock
```

### Response

```json
{
  "tag": "indie",
  "type": "recent",
  "total": 1000,
  "count": 20,
  "next_cursor": "...",
  "collection": [ ]
}
```

---

## `GET /api/tags/:tag/popular`

Popular tracks for a given tag, sorted by plays.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

### Response

```json
{
  "tag": "indie",
  "type": "popular",
  "total": 1000,
  "count": 20,
  "next_cursor": "...",
  "collection": [ ]
}
```

---

## `GET /api/tags/:tag/playlists`

Playlists tagged with the given tag.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

### Response

```json
{
  "tag": "indie",
  "type": "playlists",
  "total": 200,
  "count": 20,
  "next_cursor": "...",
  "collection": [ ]
}
```

# Search

## `GET /api/search`

Search across tracks, users, and playlists simultaneously or by type.

### Query Params

| Param | Default | Description |
|-------|---------|-------------|
| `q` | — | Search query (required) |
| `type` | `any` | `any` \| `tracks` \| `users` \| `playlists` |
| `limit` | 20 | Results per page (max 50) |
| `cursor` | — | Pagination cursor from `next_cursor` |

### Examples

```
GET /api/search?q=jaydes
GET /api/search?q=jaydes&type=tracks
GET /api/search?q=jaydes&type=users
GET /api/search?q=jaydes&type=playlists
GET /api/search?q=jaydes&type=tracks&limit=50
GET /api/search?q=jaydes&type=tracks&cursor=...
```

### Response

```json
{
  "query": "jaydes",
  "type": "tracks",
  "total": 142,
  "count": 20,
  "next_cursor": "...",
  "collection": [
    {
      "id": 2019206805,
      "permalink": "hysteric",
      "title": "hysteric",
      "stream_url": "https://sc1.maid.zone/_/api/restream/jaydes/hysteric?audio=mpeg",
      "user": { "permalink": "jaydes", "username": "true indieground" }
    }
  ]
}
```

When `type` is `any`, each item in `collection` includes a `kind` field (`track`, `user`, or `playlist`).

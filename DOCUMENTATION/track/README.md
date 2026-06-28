# Track

## `GET /api/track/:user/:permalink`

Returns full track metadata, a direct stream URL, download URL, station URN, inline comment preview, and links to all sub-endpoints.

### Query Params

| Param | Default | Description |
|-------|---------|-------------|
| `comment_limit` | 10 | Number of comments to include inline (max 50) |

### Response

```json
{
  "id": 2254866347,
  "permalink": "dont-care-didnt-ask",
  "title": "Dont care didnt ask",
  "description": null,
  "artwork": "https://your-api/api/proxy/image?url=...",
  "genre": "Rock",
  "tags": "Punk",
  "license": "all-rights-reserved",
  "policy": "MONETIZE",
  "duration_ms": 134000,
  "plays": 261725,
  "likes": 7093,
  "reposts": 122,
  "comments": 847,
  "created_at": "2026-01-27T02:35:39Z",
  "last_modified": "2026-03-07T21:57:08Z",
  "soundcloud_url": "https://soundcloud.com/jaydes/dont-care-didnt-ask",
  "stream_url": "https://sc1.maid.zone/_/api/restream/jaydes/dont-care-didnt-ask?audio=mpeg",
  "download_url": "https://sc1.maid.zone/_/download/jaydes/dont-care-didnt-ask",
  "station_urn": "soundcloud:system-playlists:track-stations:2254866347",
  "isrc": "QZJG52686774",
  "publisher_metadata": {
    "id": 2254866347,
    "urn": "soundcloud:tracks:2254866347",
    "artist": "jaydes"
  },
  "user": {
    "id": 990146308,
    "permalink": "jaydes",
    "username": "true indieground",
    "full_name": null,
    "avatar": "https://your-api/api/proxy/image?url=...",
    "verified": false,
    "soundcloud_url": "https://soundcloud.com/jaydes"
  },
  "links": {
    "related": "https://your-api/api/track/jaydes/dont-care-didnt-ask/related",
    "comments": "https://your-api/api/track/jaydes/dont-care-didnt-ask/comments",
    "albums": "https://your-api/api/track/jaydes/dont-care-didnt-ask/albums",
    "playlists": "https://your-api/api/track/jaydes/dont-care-didnt-ask/playlists"
  },
  "comments_preview": {
    "total": 847,
    "count": 10,
    "next_cursor": "...",
    "collection": [
      {
        "id": 12345,
        "body": "what a gem",
        "timestamp_ms": 12400,
        "created_at": "2026-02-01T10:00:00Z",
        "author": { "id": 99, "permalink": "someone", "username": "someone" }
      }
    ]
  }
}
```

---

## `GET /api/track/:user/:permalink/related`

Related tracks as recommended by SoundCloud.

### Response

```json
{
  "track": { "id": 2254866347, "permalink": "dont-care-didnt-ask", "title": "Dont care didnt ask" },
  "total": 10,
  "count": 10,
  "next_cursor": null,
  "collection": [ ]
}
```

---

## `GET /api/track/:user/:permalink/comments`

Paginated track comments.

### Query Params

| Param | Default | Max | Description |
|-------|---------|-----|-------------|
| `limit` | 20 | 50 | Comments per page |
| `cursor` | — | — | Pagination cursor |

### Response

```json
{
  "track": { "id": 2254866347, "permalink": "dont-care-didnt-ask", "title": "Dont care didnt ask" },
  "total": 847,
  "count": 20,
  "next_cursor": "...",
  "collection": [
    {
      "id": 12345,
      "body": "what a gem",
      "timestamp_ms": 12400,
      "created_at": "2026-02-01T10:00:00Z",
      "author": { "id": 99, "permalink": "someone", "username": "someone", "avatar": "..." }
    }
  ]
}
```

---

## `GET /api/track/:user/:permalink/albums`

Albums that contain this track.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

---

## `GET /api/track/:user/:permalink/playlists`

Playlists (non-album) that contain this track.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

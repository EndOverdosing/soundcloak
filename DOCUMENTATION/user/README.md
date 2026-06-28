# User

## `GET /api/user/:permalink`

Returns a full user profile with follower/following counts, links to their soundcloak RSS feed, station URN for their artist radio, and absolute URLs to all sub-endpoints.

### Response

```json
{
  "id": 990146308,
  "permalink": "jaydes",
  "username": "true indieground",
  "full_name": null,
  "avatar": "https://your-api/api/proxy/image?url=...",
  "verified": false,
  "soundcloud_url": "https://soundcloud.com/jaydes",
  "description": null,
  "followers": 47636,
  "following": 34,
  "likes": 0,
  "tracks": 84,
  "playlists": 11,
  "created_at": null,
  "last_modified": "2026-06-22T05:10:57Z",
  "links": [
    { "title": "Website", "url": "https://example.com" }
  ],
  "station_urn": "soundcloud:system-playlists:artist-stations:990146308",
  "rss_url": "https://sc1.maid.zone/_/rss/jaydes",
  "links": {
    "tracks": "https://your-api/api/user/jaydes/tracks",
    "popular_tracks": "https://your-api/api/user/jaydes/popular-tracks",
    "playlists": "https://your-api/api/user/jaydes/playlists",
    "albums": "https://your-api/api/user/jaydes/albums",
    "reposts": "https://your-api/api/user/jaydes/reposts",
    "likes": "https://your-api/api/user/jaydes/likes",
    "followers": "https://your-api/api/user/jaydes/followers",
    "following": "https://your-api/api/user/jaydes/following",
    "related": "https://your-api/api/user/jaydes/related"
  }
}
```

---

## `GET /api/user/:permalink/tracks`

Paginated list of a user's uploaded tracks.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

---

## `GET /api/user/:permalink/popular-tracks`

Up to 20 of the user's top tracks by play count. Not paginated.

---

## `GET /api/user/:permalink/playlists`

Paginated list of a user's playlists (excludes albums).

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

---

## `GET /api/user/:permalink/albums`

Paginated list of a user's albums.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

---

## `GET /api/user/:permalink/reposts`

Paginated list of a user's reposts. Each item has a `kind` field of either `track` or `playlist`.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

---

## `GET /api/user/:permalink/likes`

Paginated list of a user's liked tracks and playlists. Each item has a `kind` field of either `track` or `playlist`.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

---

## `GET /api/user/:permalink/followers`

Paginated list of users following this user.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

---

## `GET /api/user/:permalink/following`

Paginated list of users this user follows.

### Query Params

| Param | Default | Max |
|-------|---------|-----|
| `limit` | 20 | 50 |
| `cursor` | — | — |

---

## `GET /api/user/:permalink/related`

Related/similar artists. Not paginated.

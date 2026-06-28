# API Documentation

Full reference for all soundcloak-api endpoints.

## Sections

| Section | Endpoints |
|---------|-----------|
| [Track](./track/) | Get track, related, comments, albums, playlists |
| [User](./user/) | Get user, tracks, popular-tracks, playlists, albums, reposts, likes, followers, following, related |
| [Playlist](./playlist/) | Get playlist with paginated track resolution |
| [Search](./search/) | Search tracks, users, playlists |
| [Discover](./discover/) | Featured selections |
| [Tags](./tags/) | Recent, popular, playlists by tag |
| [Proxy](./proxy/) | Image and stream proxy |

## Common Response Fields

**Track object**

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | SoundCloud track ID |
| `permalink` | string | URL slug |
| `title` | string | Track title |
| `artwork` | string \| null | Proxied artwork URL |
| `genre` | string \| null | Genre |
| `tags` | string \| null | Space-separated tag list |
| `duration_ms` | number | Duration in milliseconds |
| `plays` | number | Play count |
| `likes` | number | Like count |
| `reposts` | number | Repost count |
| `comments` | number | Comment count |
| `stream_url` | string \| null | Restream URL |
| `download_url` | string \| null | Download URL |
| `station_urn` | string \| null | Track radio station URN |
| `soundcloud_url` | string \| null | Original SoundCloud URL |
| `isrc` | string \| null | ISRC code |
| `publisher_metadata` | object \| null | Publisher info |
| `user` | object | Track author (minimal user object) |

**User object (minimal)**

| Field | Type | Description |
|-------|------|-------------|
| `id` | number | SoundCloud user ID |
| `permalink` | string | URL slug |
| `username` | string | Display name |
| `full_name` | string \| null | Full name |
| `avatar` | string \| null | Proxied avatar URL |
| `verified` | boolean | Verified artist |
| `soundcloud_url` | string | Original SoundCloud URL |

**Paginated response**

| Field | Type | Description |
|-------|------|-------------|
| `total` | number | Total results available |
| `count` | number | Results in this page |
| `next_cursor` | string \| null | Pass as `?cursor=` for the next page |
| `collection` | array | Results |

## Errors

All errors return JSON with an `error` field and optionally a `details` field with the upstream message.

| Status | Meaning |
|--------|---------|
| 400 | Bad request / missing params |
| 404 | Resource not found |
| 502 | Upstream soundcloak error |

```json
{
  "error": "Track not found"
}
```

# Playlist

## `GET /api/playlist/:user/:permalink`

Returns a playlist or album with its tracks. Handles soundcloak's stub-track pagination format — the first page resolves as many tracks as possible, and `next_cursor` contains the remaining track IDs to fetch on the next request.

### Query Params

| Param | Default | Description |
|-------|---------|-------------|
| `tracks` | `true` | Set to `false` to skip track fetching |
| `pagination` | — | Comma-separated track IDs to fetch (from `next_cursor`) |

### How pagination works

SoundCloud returns large playlists with most tracks as stubs — objects that only have an `id` and no other data. The API resolves stubs by batching them through `/_/api/v2/tracks?ids=...` in chunks of 50.

When there are more stubs than can be resolved in one request, the response includes `next_cursor` with the remaining IDs. Pass those as `?pagination=` on your next request to get the next page.

**First request**
```
GET /api/playlist/jaydes/like-this-playlist
```

**Subsequent pages**
```
GET /api/playlist/jaydes/like-this-playlist?pagination=2019206521,2019207897,2019207133,...
```

### Response

```json
{
  "id": 1959057265,
  "permalink": "like-this-playlist",
  "title": "jaydes",
  "description": null,
  "artwork": "https://your-api/api/proxy/image?url=...",
  "kind": "playlist",
  "is_album": false,
  "track_count": 339,
  "likes": 6254,
  "tags": null,
  "created_at": "2025-01-27T15:12:01Z",
  "last_modified": "2026-06-22T05:10:32Z",
  "soundcloud_url": "https://soundcloud.com/jaydes/sets/like-this-playlist",
  "user": {
    "id": 990146308,
    "permalink": "jaydes",
    "username": "true indieground",
    "full_name": null,
    "avatar": "https://your-api/api/proxy/image?url=...",
    "verified": false,
    "soundcloud_url": "https://soundcloud.com/jaydes"
  },
  "next_cursor": "2019206521,2019207897,2019207133,...",
  "tracks": [
    {
      "id": 2091426996,
      "permalink": "i-will-always-be-near-discord",
      "title": "i will always be near (discord leak) ft jaydes",
      "stream_url": "https://sc1.maid.zone/_/api/restream/user-996091006/i-will-always-be-near-discord?audio=mpeg",
      "user": { "permalink": "user-996091006", "username": "wifiskeleton" }
    }
  ]
}
```

### Notes

- Tracks with no `title` in the response are stubs that couldn't be resolved — this can happen if SoundCloud rate-limits the batch fetch
- `next_cursor` is only present when there are remaining unresolved tracks
- Setting `?tracks=false` returns the playlist metadata only, no track fetching occurs

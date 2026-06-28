# Discover

## `GET /api/discover`

Returns SoundCloud's featured selections — promoted playlists, trending tracks, and curated picks. Each selection contains a typed `items` array where each item is a `track`, `playlist`, `album`, or `user`.

### Response

```json
{
  "count": 4,
  "collection": [
    {
      "id": "promoted_tracks",
      "title": "Featured Tracks",
      "description": null,
      "kind": "selection",
      "items": [
        {
          "kind": "track",
          "id": 2019206805,
          "permalink": "hysteric",
          "title": "hysteric",
          "stream_url": "https://sc1.maid.zone/_/api/restream/jaydes/hysteric?audio=mpeg",
          "user": { "permalink": "jaydes", "username": "true indieground" }
        },
        {
          "kind": "playlist",
          "id": 1959057265,
          "permalink": "like-this-playlist",
          "title": "jaydes",
          "track_count": 339
        }
      ]
    }
  ]
}
```

### Notes

- Selections with no items are filtered out before returning
- Item `kind` can be `track`, `playlist`, `album`, or `user`
- Results reflect what SoundCloud surfaces for an unauthenticated session via the soundcloak proxy

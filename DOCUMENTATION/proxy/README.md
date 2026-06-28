# Proxy

These endpoints exist to serve proxied media through your domain, avoiding direct links to SoundCloud CDN infrastructure. All `artwork` and `stream_url` fields in API responses already point here.

## `GET /api/proxy/image`

Proxies an artwork image from SoundCloud's CDN. Automatically upgrades image URLs to `t500x500` quality.

### Query Params

| Param | Description |
|-------|-------------|
| `url` | URL-encoded SoundCloud CDN image URL |

### Example

```
GET /api/proxy/image?url=https%3A%2F%2Fi1.sndcdn.com%2Fartworks-abc123-t500x500.jpg
```

---

## `GET /api/proxy/stream`

Proxies an audio stream URL. Used when `proxyStreams` is enabled in `config.json`.

### Query Params

| Param | Description |
|-------|-------------|
| `url` | URL-encoded restream URL |

### Example

```
GET /api/proxy/stream?url=https%3A%2F%2Fsc1.maid.zone%2F_%2Fapi%2Frestream%2Fjaydes%2Fhysteric%3Faudio%3Dmpeg
```

### Notes

- Stream proxying is controlled by `preferences.proxyStreams` in `config.json`
- When `proxyStreams` is `false`, `stream_url` in track responses points directly to the soundcloak instance instead of through this proxy
- Image URLs always route through the proxy regardless of config

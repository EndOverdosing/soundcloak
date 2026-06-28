import {
  json, error, proxy, handleOptions, getOrigin,
  formatTrack, formatUser, formatPaginated, BASE, PREFS
} from "../../../_shared/utils.js";

function formatComment(c, origin) {
  return {
    id: c.id,
    body: c.body,
    timestamp_ms: c.timestamp,
    created_at: c.created_at,
    author: formatUser(c.user, true, origin),
  };
}

export async function onRequestGet({ request, params }) {
  const { user, permalink } = params;
  if (!user || !permalink) return error("Missing user or permalink");
  const origin = getOrigin(request);
  const url = new URL(request.url);
  const commentLimit = Math.min(parseInt(url.searchParams.get("comment_limit") || "10", 10), 50);

  try {
    const data = await proxy("/_/api/v2/resolve", {
      url: `https://soundcloud.com/${user}/${permalink}`,
    });
    if (!data || data.kind !== "track") return error("Track not found", 404);

    const audioFormat = PREFS.restreamAudio === "aac" ? "aac" : "mpeg";
    const track = formatTrack(data, origin);
    track.stream_url = `${BASE}/_/api/restream/${user}/${permalink}?audio=${audioFormat}`;
    track.download_url = `${BASE}/_/download/${user}/${permalink}`;
    track.station_urn = data.station_urn || (data.id ? `soundcloud:system-playlists:track-stations:${data.id}` : null);
    track.links = {
      related: `${origin}/api/track/${user}/${permalink}/related`,
      comments: `${origin}/api/track/${user}/${permalink}/comments`,
      albums: `${origin}/api/track/${user}/${permalink}/albums`,
      playlists: `${origin}/api/track/${user}/${permalink}/playlists`,
    };

    const commentData = await proxy(`/_/api/v2/tracks/${data.id}/comments`, {
      limit: commentLimit,
      threaded: 1,
    });
    const comments = formatPaginated(commentData, (c) => formatComment(c, origin));
    track.comments_preview = comments;

    return json(track);
  } catch (err) {
    return error("Track fetch failed", 502, err.message);
  }
}

export async function onRequestOptions() {
  return handleOptions();
}
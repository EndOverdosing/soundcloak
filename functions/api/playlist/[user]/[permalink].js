import {
  json, error, proxy, handleOptions, getOrigin,
  formatTrack, formatPlaylist, BASE, PREFS
} from "../../../_shared/utils.js";

export async function onRequestGet({ request, params }) {
  const url = new URL(request.url);
  const origin = getOrigin(request);
  const { user, permalink } = params;
  const includeTracks = url.searchParams.get("tracks") !== "false";
  const paginationParam = url.searchParams.get("pagination");

  try {
    const data = await proxy("/_/api/v2/resolve", {
      url: `https://soundcloud.com/${user}/sets/${permalink}`,
    });

    if (!data || (data.kind !== "playlist" && data.kind !== "album")) return error("Playlist not found", 404);

    const fmt = PREFS.restreamAudio === "aac" ? "aac" : "mpeg";

    const playlist = formatPlaylist(data, false, origin);

    if (includeTracks) {
      let tracks;

      if (paginationParam) {
        const ids = paginationParam.split(",").map((id) => id.trim()).filter(Boolean);
        const chunks = [];
        for (let i = 0; i < ids.length; i += 50) {
          chunks.push(ids.slice(i, i + 50));
        }
        const fetched = await Promise.all(
          chunks.map((chunk) =>
            proxy("/_/api/v2/tracks", { ids: chunk.join(",") })
          )
        );
        const trackMap = new Map();
        for (const batch of fetched) {
          for (const t of Array.isArray(batch) ? batch : (batch.collection || [])) {
            trackMap.set(String(t.id), t);
          }
        }
        const allIds = paginationParam.split(",").map((id) => id.trim()).filter(Boolean);
        tracks = allIds.map((id) => {
          const t = trackMap.get(id);
          if (!t) return { id: Number(id), stream_url: null, user: null };
          const formatted = formatTrack(t, origin);
          if (formatted?.user?.permalink && formatted?.permalink) {
            formatted.stream_url = `${BASE}/_/api/restream/${formatted.user.permalink}/${formatted.permalink}?audio=${fmt}`;
          }
          return formatted;
        });
      } else {
        tracks = (data.tracks || []).map((t) => {
          const formatted = formatTrack(t, origin);
          if (formatted?.user?.permalink && formatted?.permalink) {
            formatted.stream_url = `${BASE}/_/api/restream/${formatted.user.permalink}/${formatted.permalink}?audio=${fmt}`;
          }
          return formatted;
        });

        const stubIds = tracks
          .filter((t) => !t.title)
          .map((t) => String(t.id));

        if (stubIds.length > 0) {
          const chunks = [];
          for (let i = 0; i < stubIds.length; i += 50) {
            chunks.push(stubIds.slice(i, i + 50));
          }
          const fetched = await Promise.all(
            chunks.map((chunk) =>
              proxy("/_/api/v2/tracks", { ids: chunk.join(",") })
            )
          );
          const stubMap = new Map();
          for (const batch of fetched) {
            for (const t of Array.isArray(batch) ? batch : (batch.collection || [])) {
              stubMap.set(String(t.id), t);
            }
          }
          tracks = tracks.map((t) => {
            if (t.title) return t;
            const full = stubMap.get(String(t.id));
            if (!full) return t;
            const formatted = formatTrack(full, origin);
            if (formatted?.user?.permalink && formatted?.permalink) {
              formatted.stream_url = `${BASE}/_/api/restream/${formatted.user.permalink}/${formatted.permalink}?audio=${fmt}`;
            }
            return formatted;
          });
        }

        const remainingStubs = tracks.filter((t) => !t.title).map((t) => String(t.id));
        if (remainingStubs.length > 0) {
          playlist.next_cursor = remainingStubs.join(",");
        }
      }

      playlist.tracks = tracks;
    }

    return json(playlist);
  } catch (err) {
    return error("Playlist fetch failed", 502, err.message);
  }
}

export async function onRequestOptions() {
  return handleOptions();
}
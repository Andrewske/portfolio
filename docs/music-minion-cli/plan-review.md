 Next Steps

  Ready to walk through findings. Say "go" to start one-at-a-time review.

✻ Crunched for 2m 47s

❯ go 

● Categorizing Findings

  Discussion Findings (need your input):
  - Finding 2: Missing playlist_tracks population
  - Finding 3: Missing player SC streaming support
  - Finding 5: Likes not synced
  - Finding 6: Other start_play() callers

  Autosolve Findings (clear fixes, ≥90% confidence):
  - Finding 1: Async/sync mismatch
  - Finding 4: CREATE TABLE not updated
  - Finding 7: Task 07 code mismatch
  - Finding 8: Incomplete track metadata

  ---
  Finding 2: Missing playlist_tracks population

  Problem: Task 03's sync creates playlist records and track records, but never inserts into playlist_tracks to link them. Playlists would show with correct track_count but display 0 tracks.

  Option 1: Insert playlist_tracks inside the track loop (Recommended)
  - Pro: Matches existing patterns, maintains position order
  - Con: Requires tracking inserted track's DB ID (need RETURNING or lastrowid)

  Option 2: Batch insert after all tracks created
  - Pro: Single executemany call, slightly faster
  - Con: Need to collect track IDs first, more complex logic

  Option 3: Use a trigger to auto-populate
  - Pro: Automatic, can't forget
  - Con: Over-engineered, SQLite triggers are fragile

  Recommended: Option 1 (85% confidence) - Insert in loop, use cursor.lastrowid to get track ID after INSERT

  Your call?

❯ /best-idea 

● Read(docs/elegant-leaping-curry/03-backend-soundcloud-sync.md)
  ⎿  Read 127 lines

● Search(pattern: "INSERT INTO playlist_tracks", path: "~/coding/music-minion-cli", output_mode: "content")
  ⎿  Found 84 lines (ctrl+o to expand)

● Read(web/backend/routers/soundcloud.py)
  ⎿  Read 80 lines

● Problem

  - Task 03's sync endpoint creates playlist and track records but never links them via playlist_tracks table
  - Playlists would display correct track_count but show 0 tracks in UI
  - Need to maintain position order for proper playlist ordering

  Proposed Plan (From Context)

  - Option 1 (from plan review): Insert playlist_tracks inside track loop using cursor.lastrowid
  - Option 2: Batch insert after all tracks created
  - Option 3: Use a trigger to auto-populate

  Top 3 Solutions

  1) Batch Insert After Track Upserts (executemany pattern)

  - Approach: First upsert all tracks, then query back their IDs by soundcloud_id, then batch insert into playlist_tracks via executemany. This matches the existing pattern in create_playlist_from_matches() at soundcloud.py:574-582.
  - Pros: Matches existing codebase pattern exactly, single executemany call is efficient, handles upsert case where track already exists
  - Cons: Requires extra SELECT to get track IDs after upsert (can't use lastrowid with ON CONFLICT)
  - Effort: S
  - Risk: Low

  2) Track IDs Inline with RETURNING clause

  - Approach: Modify INSERT to use RETURNING id to get track ID inline, then insert playlist_track immediately. Avoids extra SELECT.
  - Pros: No extra query, cleaner flow
  - Cons: SQLite RETURNING requires 3.35+ (2021), may not work with ON CONFLICT in all cases, not used elsewhere in codebase
  - Effort: S
  - Risk: Med (SQLite version dependency, untested pattern in codebase)

  3) Two-Pass: Insert tracks, then SELECT IDs, then link

  - Approach: Insert all tracks first (collecting soundcloud_ids), then SELECT to get (id, soundcloud_id) pairs, build playlist_tracks list, executemany insert. Similar to Option 1 but more explicit.
  - Pros: Very clear logic, handles duplicates gracefully, easy to debug
  - Cons: Three DB operations instead of two, slightly more code
  - Effort: S
  - Risk: Low

  Recommendation

  - Pick: #1 (Batch Insert After Track Upserts)
  - Why this is best:
    - Exact same pattern already proven at soundcloud.py:574-582 (create_playlist_from_matches)
    - Single executemany is the established batch-insert pattern throughout codebase
    - The SELECT to get track IDs is trivial: SELECT id, soundcloud_id FROM tracks WHERE soundcloud_id IN (...) AND source = 'soundcloud'
    - No SQLite version concerns, no new patterns to introduce

  Implementation sketch:
  # After upserting tracks, get their DB IDs
  sc_ids = [track['soundcloud_id'] for track in sc_tracks]
  placeholders = ','.join('?' * len(sc_ids))
  cursor = db.execute(
      f"SELECT id, soundcloud_id FROM tracks WHERE soundcloud_id IN ({placeholders}) AND source = 'soundcloud'",
      sc_ids
  )
  id_map = {row['soundcloud_id']: row['id'] for row in cursor.fetchall()}

  # Batch insert playlist_tracks
  playlist_track_rows = [
      (playlist_id, id_map[track['soundcloud_id']], idx + 1)
      for idx, track in enumerate(sc_tracks)
      if track['soundcloud_id'] in id_map
  ]
  db.executemany(
      "INSERT OR IGNORE INTO playlist_tracks (playlist_id, track_id, position) VALUES (?, ?, ?)",
      playlist_track_rows
  )

✻ Worked for 40s

❯ agreed 

● Finding 2 resolved: Batch insert after track upserts using existing executemany pattern.

  ---
  Finding 3: Missing player SC streaming support

  Problem: No task addresses how source='soundcloud' tracks will actually play. The player assumes local_path exists. SC-only tracks have NULL local_path and need stream URL resolution via get_stream_url() from the SoundCloud API.

  Option 1: Resolve stream URL at play request time (backend)
  - Pro: Minimal frontend changes, URL ready when track data sent
  - Con: Adds latency to every play request, URL expires (SC stream URLs are time-limited)

  Option 2: Lazy resolve when track becomes current (frontend + new endpoint)
  - Pro: Better UX (play starts faster), resolves fresh URL just before needed
  - Con: Requires frontend PlayerBar changes, new /api/soundcloud/stream-url/{track_id} endpoint

  Option 3: Store stream URL during sync, refresh periodically
  - Pro: No latency at play time
  - Con: SC stream URLs expire (~hours), stale URLs cause playback failures, complex refresh logic

  Option 4: Use source_url (permalink) and let yt-dlp resolve at playback
  - Pro: Already works this way for imported SC tracks, no new code needed
  - Con: yt-dlp adds ~2-3s latency per track, requires yt-dlp on client

  Recommended: Option 2 (75% confidence) - Lazy resolve gives best UX, matches Spotify Connect pattern

  But I should investigate what the current playback flow actually does for SC tracks. Should I dig deeper, or do you have context on how playback currently works?

❯ /best-idea 

● Let me investigate how playback currently works for SC tracks in the codebase.

● Search(pattern: "local_path|source.*soundcloud", path: "web/backend/routers/player.py", output_mode: "content")
  ⎿  Found 0 lines 

● Read(web/backend/routers/tracks.py)
  ⎿  Read 60 lines

● Interesting! The streaming endpoint already handles SC tracks. Let me check how the frontend uses this.

● Search(pattern: "/tracks/.*stream|streamUrl|audioSrc", path: "web/frontend/src", output_mode: "content")
  ⎿  Found 10 lines (ctrl+o to expand)

● Read(web/frontend/src/hooks/usePlayer.ts)
  ⎿  Read 149 lines

● This is very helpful. Let me also check if source_url is being returned in track metadata.

● Read(web/backend/queries/tracks.py)
  ⎿  Read 46 lines

● Now I understand the full picture. Let me check what the source_url redirect actually does - does it redirect to the permalink or to the actual stream URL?

● Search(pattern: "source_url.*permalink|permalink_url", path: "~/coding/music-minion-cli", output_mode: "content")
  ⎿  Found 16 lines (ctrl+o to expand)

● Read(src/music_minion/domain/radio/stream_resolver.py)
  ⎿  Read 141 lines

● Now I see the full picture. But the /stream endpoint does a RedirectResponse(row["source_url"]) which redirects to the permalink, not a resolved stream URL. Let me check if this actually works with the browser's audio element.

● Search(pattern: "resolve_stream_url", path: "web", output_mode: "content")
  ⎿  Found 0 lines 

● Search(pattern: "resolve_stream_url", path: "src")
  ⎿  Found 2 files (ctrl+o to expand)

● Read(src/music_minion/domain/radio/scheduler.py)
  ⎿  Read 100 lines

● Now I have complete context. Let me synthesize the analysis.

  Problem

  - SC tracks with source='soundcloud' have NULL local_path and need stream URL resolution
  - Current /tracks/{id}/stream endpoint redirects to source_url (permalink), not actual stream URL
  - Browser audio element cannot play SoundCloud permalinks directly (redirecting to webpage, not audio)
  - resolve_stream_url() exists but uses yt-dlp which adds 2-3s latency
  - The Liquidsoap scheduler uses resolve_stream_url() for non-local tracks, but web player doesn't

  Proposed Plan (From Context)

  - Option 1: Resolve at play request time (backend)
  - Option 2: Lazy resolve when track becomes current (frontend + new endpoint)
  - Option 3: Store stream URL during sync, refresh periodically
  - Option 4: Use permalink + yt-dlp at playback

  Top 3 Solutions

  1) Fix /stream endpoint to use resolve_stream_url() for SC tracks

  - Approach: Modify tracks.py:stream_audio() to call resolve_stream_url(source_url) instead of RedirectResponse(source_url) for SC tracks. Return 302 redirect to resolved stream URL. Uses existing stream_resolver.py with 10-min cache.
  - Pros: Minimal change (3-5 lines), uses existing infrastructure, no frontend changes, cache handles repeated plays
  - Cons: First play adds ~2-3s latency for yt-dlp resolution, requires yt-dlp on server (already installed)
  - Effort: S
  - Risk: Low

  2) Preload + resolve stream URL when track enters queue

  - Approach: When batch_fetch_tracks_with_metadata() runs, spawn background task to pre-resolve stream URLs for SC tracks. Store in memory cache. Stream endpoint serves from cache.
  - Pros: Zero latency at play time, proactive resolution
  - Cons: More complex, background tasks, memory usage for cache, URLs may expire before track played
  - Effort: M
  - Risk: Med

  3) Use SoundCloud API's get_stream_url() instead of yt-dlp

  - Approach: Replace yt-dlp resolution with direct SoundCloud API call using api.py:get_stream_url() which returns /stream?oauth_token=.... Faster than yt-dlp.
  - Pros: Faster (~200ms vs 2-3s), uses official API, already implemented in codebase
  - Cons: Requires valid SC auth token (only works for authenticated users), doesn't work for other sources (YouTube)
  - Effort: S
  - Risk: Med (auth dependency)

  Recommendation

  - Pick: #1 (Fix /stream endpoint to use resolve_stream_url())
  - Why this is best:
    - Already works for Liquidsoap: The pattern is proven in scheduler.py:86-92 - same code path
    - Minimal change: 5 lines in tracks.py, no frontend changes, no new infrastructure
    - Built-in caching: stream_resolver.py already caches URLs for 10 minutes, so repeat plays are instant
    - Source-agnostic: Works for SoundCloud, YouTube, or any yt-dlp supported source
  - Trade-off acknowledged: First play of each track has ~2-3s latency. This is acceptable for initial implementation; can optimize later with preloading if UX suffers.

  Implementation:
  # In tracks.py:stream_audio(), replace lines 80-82:
  if row and row["source"] == "soundcloud" and row["source_url"]:
      from music_minion.domain.radio.stream_resolver import resolve_stream_url
      stream_url = resolve_stream_url(row["source_url"])
      if stream_url:
          logger.info(f"Resolved stream for track {track_id}")
          return RedirectResponse(stream_url)
      else:
          raise HTTPException(503, "Failed to resolve stream URL")

✻ Baked for 1m 21s

❯ If you were to start over and build this from the ground up is that the way you would do it? 

● Honestly? No.

  If I were starting fresh, I'd use SoundCloud's API directly. Looking at api.py:258-280, there's already get_stream_url() that returns a direct stream URL with OAuth token:

  return f"{API_BASE_URL}/tracks/{provider_id}/stream?oauth_token={access_token}"

  That's ~200ms vs 2-3s for yt-dlp. And get_web_provider_state() in soundcloud_auth.py already provides the auth context.

  The cleaner architecture:

  /tracks/{id}/stream
    → source='soundcloud' + auth valid → SC API get_stream_url() → redirect
    → source='soundcloud' + no auth   → yt-dlp fallback
    → source='youtube'                → yt-dlp (no API)
    → source='local'                  → serve file

  yt-dlp becomes the fallback for unauthenticated SC or other providers, not the primary path.

  This is:
  - Faster: API call vs scraping
  - More reliable: Official endpoint vs reverse-engineering
  - Already implemented: Just need to wire it up

  The reason I defaulted to yt-dlp was pattern-matching on what scheduler.py does - but that's the Liquidsoap path which doesn't have web auth context. Different situation.

  Revised recommendation: Use get_stream_url() for SC tracks via get_web_provider_state(), fall back to yt-dlp only when auth is missing or for non-SC sources.

  Want me to update the finding with this approach?
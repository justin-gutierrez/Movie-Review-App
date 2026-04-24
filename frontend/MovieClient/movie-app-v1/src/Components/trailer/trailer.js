import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPlayer from 'react-player';

import './trailer.css';

function toPlayableUrl(input) {
  if (!input || typeof input !== 'string') return null;

  const trimmed = input.trim();

  // If backend stored just the YouTube id.
  if (/^[a-zA-Z0-9_-]{11}$/.test(trimmed)) {
    return `https://www.youtube-nocookie.com/embed/${trimmed}`;
  }

  // If backend stored a URL missing protocol.
  if (trimmed.startsWith('www.')) return `https://${trimmed}`;

  // Convert common YouTube URLs to an embed URL (more reliable than watch URLs).
  try {
    const url = new URL(trimmed);
    const host = url.hostname.replace(/^www\./, '');

    let id = null;
    if (host === 'youtu.be') {
      id = url.pathname.split('/').filter(Boolean)[0] ?? null;
    } else if (host === 'youtube.com' || host === 'm.youtube.com') {
      id = url.searchParams.get('v');
      if (!id) {
        const m = url.pathname.match(/\/(embed|shorts)\/([a-zA-Z0-9_-]{11})/);
        id = m?.[2] ?? null;
      }
    }

    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
      return `https://www.youtube-nocookie.com/embed/${id}`;
    }
  } catch {
    // ignore
  }

  return trimmed;
}

const Trailer = () => {
  const { state } = useLocation();
  const url = toPlayableUrl(state?.trailerLink);
  const [ready, setReady] = useState(false);
  const [errored, setErrored] = useState(false);

  const openUrl = useMemo(() => {
    if (!url) return null;
    // If we're using an embed-safe URL, keep it the same for open-in-new-tab.
    return url;
  }, [url]);

  // Temporary debug: helps confirm what we receive from routing/API.
  // You can remove these once trailers work.
  // eslint-disable-next-line no-console
  console.log('Trailer state.trailerLink:', state?.trailerLink);
  // eslint-disable-next-line no-console
  console.log('Trailer playable url:', url);

  useEffect(() => {
    setReady(false);
    setErrored(false);
  }, [url]);

  return (
    <div className="react-player-container">
      {url ? (
        <>
          <ReactPlayer
            controls
            playing
            muted
            url={url}
            width="100%"
            height="100%"
            config={{
              youtube: {
                playerVars: {
                  autoplay: 1,
                  playsinline: 1,
                  rel: 0,
                origin: window.location.origin,
                },
              },
            }}
            onReady={() => {
              setReady(true);
              // eslint-disable-next-line no-console
              console.log('ReactPlayer ready');
            }}
            onError={(e) => {
              setErrored(true);
              // eslint-disable-next-line no-console
              console.error('ReactPlayer error', e);
            }}
          />
          <div style={{ color: 'white', padding: 12, fontSize: 14 }}>
            <div>Player status: {errored ? 'error' : ready ? 'ready' : 'loading…'}</div>
            {openUrl ? (
              <a href={openUrl} target="_blank" rel="noreferrer" style={{ color: '#7dd3fc' }}>
                Open trailer in YouTube
              </a>
            ) : null}
            {!ready && !errored ? (
              <div style={{ opacity: 0.85, marginTop: 8 }}>
                If this stays stuck on “loading…”, try disabling adblock/privacy extensions for
                `localhost`, or open in an incognito window.
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div style={{ color: 'white', padding: 16 }}>
          No trailer URL found. (This page needs navigation state or a route param.)
        </div>
      )}
    </div>
  );
};

export default Trailer;

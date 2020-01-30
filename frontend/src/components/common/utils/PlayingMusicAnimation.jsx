import React from 'react';
const MusicAnimation = () => (
  <div className="la-line-scale-pulse-out la-sm">
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

const PlayingMusicAnimation = () => (
  <div className="music-background">
    <MusicAnimation />
  </div>
);

export const Loading = () => (
  <div aria-hidden="true" className="loading d-inline-block px-2" role="status">
    <MusicAnimation />
  </div>
);

export default PlayingMusicAnimation;

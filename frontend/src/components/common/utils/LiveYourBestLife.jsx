import React from 'react';
import Typed from 'react-typed';

const LiveYourBestLife = () => (
  <Typed
    backDelay={1000}
    backSpeed={100}
    loop
    showCursor={false}
    strings={['Live your best Live^1000', 'Live your best Life^20000']}
    typeSpeed={40}
  />
  //   <Typed
  //   fadeOut={true}
  //   loopCount={1}
  //   showCursor={false}
  //   strings={['Live your best Live', '', 'Live your best Life']}
  //   typeSpeed={40}
  // />
);

export default LiveYourBestLife;

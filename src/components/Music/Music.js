import React from 'react';
import Head from './Head/head';
import TabBar from './TabBar/tabBar';

const Music = ({
  user, myMusic, recommendMusic, currentMusic, selectedMusicIds, Actions
}) => (
  <div className="Music">
    <Head
      user={user}
      selectedMusicIds={selectedMusicIds}
    />
    <TabBar
      myMusic={myMusic}
      recommendMusic={recommendMusic}
      currentMusic={currentMusic}
      Actions={Actions}
    />
  </div>
);

export default Music;

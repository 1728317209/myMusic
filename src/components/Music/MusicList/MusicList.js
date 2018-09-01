import React from 'react';
import MusicListDemo from './MusicListDemo';
import './index.css';

const MusicList = ({
  myMusic, recommendMusic, choiceFlag, selectedMusicIds, onSelectMusic
}) => (
  <div>
    <MusicListDemo
      title="我的音乐"
      listKey={0}
      musicList={myMusic.myMusicList}
      choiceFlag={choiceFlag}
      selectedMusicIds={selectedMusicIds}
      onSelectMusic={onSelectMusic}
    />
    <MusicListDemo
      title="推荐音乐"
      listKey={1}
      musicList={recommendMusic}
      choiceFlag={choiceFlag}
      selectedMusicIds={selectedMusicIds}
      onSelectMusic={onSelectMusic}
    />
  </div>
);

export default MusicList;

import React, { Component } from 'react';
import RenderMusicList from './renderMusicList';
import './index.css';

export default class MusicList extends Component {
  state = {
    //
  }

  render() {
    const {
      myMusic,
      recommendMusic,
      choiceFlag,
      selectedMusicIds,
      onSelectMusic
    } = this.props;
    return (
      <div>
        <RenderMusicList
          title="我的音乐"
          musicList={myMusic.myMusicList}
          choiceFlag={choiceFlag}
          selectedMusicIds={selectedMusicIds}
          onSelectMusic={onSelectMusic}
        />
        <RenderMusicList
          title="推荐音乐"
          musicList={recommendMusic}
          choiceFlag={choiceFlag}
          selectedMusicIds={selectedMusicIds}
          onSelectMusic={onSelectMusic}
        />
      </div>
    );
  }
}


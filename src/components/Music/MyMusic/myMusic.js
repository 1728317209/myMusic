import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import './index.css';

export default class MyMusic extends Component {
  state = {
    //
  }

  getSelectIconClass = id => {
    const { choiceFlag, selectedMusicIds } = this.props;
    if (choiceFlag) {
      if (!selectedMusicIds.includes(id)) {
        return 'single-select-icon single-select-icon-hide';
      }
      return 'single-select-icon';
    } else if (!selectedMusicIds.includes(id)) {
      return 'Multiple-select-icon Multiple-select-icon-hide';
    }
    return 'Multiple-select-icon';
  }

  renderSelectIconArea = id => {
    const { choiceFlag, selectedMusicIds } = this.props;
    if (choiceFlag) {
      return <img src={imgs.select_music} className={this.getSelectIconClass(id)} alt="" />;
    }
    let idx = selectedMusicIds.indexOf(id);
    idx = idx === -1 ? null : idx;
    return <div className={this.getSelectIconClass(id)}>{idx}</div>;
  }

  renderMyMusic = () => {
    const { myMusic, onSelectMusic } = this.props;
    if (myMusic.myMusicList && myMusic.myMusicList.length) {
      return myMusic.myMusicList.map(music => (
        <div className="myMusicItem" key={music.id} onClick={() => onSelectMusic(music.id)}>
          {
            this.renderSelectIconArea(music.id)
          }
          <div>{music.name}</div>
        </div>
      ));
    }
    return null;
  }
  render() {
    return (
      <div className="MyMusic">
        <div className="myMusic-title">
          <span>我的音乐</span>
        </div>
        {
          this.renderMyMusic()
        }
      </div>
    );
  }
}

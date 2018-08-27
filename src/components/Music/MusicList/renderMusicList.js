import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';

export default class RenderMusicList extends Component {
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
  };

  renderSelectIconArea = id => {
    const { choiceFlag, selectedMusicIds } = this.props;
    if (choiceFlag) {
      return <img src={imgs.select_music} className={this.getSelectIconClass(id)} alt="" />;
    }
    let idx = selectedMusicIds.indexOf(id);
    idx = idx === -1 ? null : idx + 1;
    return <div className={this.getSelectIconClass(id)}>{idx}</div>;
  };

  renderMusic = () => {
    const { musicList, onSelectMusic } = this.props;
    if (musicList && musicList.length) {
      return musicList.map(music => (
        <div className="musicListItem divider" key={music.id} onClick={() => onSelectMusic(music.id)}>
          {
            this.renderSelectIconArea(music.id)
          }
          <div>{music.name}</div>
        </div>
      ));
    }
    return null;
  };
  render() {
    return (
      <div className="MusicList">
        <div className="Music-title">
          <span>{this.props.title}</span>
        </div>
        {
          this.renderMusic()
        }
      </div>
    );
  }
}


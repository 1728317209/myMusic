import React, { Component } from 'react';
import Selection from '../Selection/selection';
import MusicList from '../MusicList/MusicList';
import Foot from '../Foot/Foot';
import './index.css';

export default class TabBarBody extends Component {
  renderTabBarBody = () => {
    const {
      switchTabFlag,
      choiceFlag,
      onChoice,
      myMusic,
      recommendMusic,
      selectedMusicIds,
      selectedMusicTypes,
      onSelectMusic,
      onDeleteMusic,
      onMaskShow,
      currentMusic,
      onMessageShow
    } = this.props;

    if (switchTabFlag === 'mine') {
      return (
        <div className="myMusicBody">
          <Selection
            choiceFlag={choiceFlag}
            onChoice={onChoice}
          />
          <MusicList
            myMusic={myMusic}
            recommendMusic={recommendMusic}
            choiceFlag={choiceFlag}
            selectedMusicIds={selectedMusicIds}
            onSelectMusic={onSelectMusic}
          />
          <Foot
            onDeleteMusic={onDeleteMusic}
            onMaskShow={onMaskShow}
            choiceFlag={choiceFlag}
            selectedMusicIds={selectedMusicIds}
            currentMusic={currentMusic}
            onMessageShow={onMessageShow}
            selectedMusicTypes={selectedMusicTypes}
          />
        </div>
      );
    }
    return null;
  }

  render() {
    return (
      <div>
        {
          this.renderTabBarBody()
        }
      </div>
    );
  }
}

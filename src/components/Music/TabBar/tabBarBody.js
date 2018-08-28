import React, { Component } from 'react';
import Selection from '../Selection/selection';
import MusicList from '../MusicList/MusicList';
import Foot from '../Foot/Foot';
import './index.css';

export default class TabBarBody extends Component {
  renderTabBarBody = () => {
    const {
      myMusic, recommendMusic, currentMusic,
      switchTabFlag, choiceFlag, selectedMusicIds, selectedMusicTypes,
      onChoice, onSelectMusic, onMaskShow, onMessageShow
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

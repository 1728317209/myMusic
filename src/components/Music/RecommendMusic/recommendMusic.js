import React, { Component } from 'react';
import RenderMusicList from './recommendMusic';
import './index.css';

export default class RecommendMusic extends Component {
  state = {
    //
  }

  // getSelectIconClass = id => {
  //   const { choiceFlag, selectedMusicIds } = this.props;
  //   if (choiceFlag) {
  //     if (!selectedMusicIds.includes(id)) {
  //       return 'single-select-icon single-select-icon-hide';
  //     }
  //     return 'single-select-icon';
  //   } else if (!selectedMusicIds.includes(id)) {
  //     return 'Multiple-select-icon Multiple-select-icon-hide';
  //   }
  //   return 'Multiple-select-icon';
  // }

  // renderRecommendMusic = () => {
  //   const { recommendMusic, onSelectMusic } = this.props;
  //   if (recommendMusic && recommendMusic.length) {
  //     return recommendMusic.map(music => (
  //       <div className="RecommendMusicItem" key={music.id} onClick={() => onSelectMusic(music.id)}>
  //         {
  //           this.renderSelectIconArea(music.id)
  //         }
  //         <div>{music.name}</div>
  //       </div>
  //     ));
  //   }
  //   return null;
  // }

  // renderSelectIconArea = id => {
  //   const { choiceFlag, selectedMusicIds } = this.props;
  //   if (choiceFlag) {
  //     return <img src={imgs.select_music} className={this.getSelectIconClass(id)} alt="" />;
  //   }
  //   let idx = selectedMusicIds.indexOf(id);
  //   idx = idx === -1 ? null : idx;
  //   return <div className={this.getSelectIconClass(id)}>{idx}</div>;
  // }

  render() {
    const { recommendMusic, choiceFlag, selectedMusicIds } = this.props;
    return (
      // <RenderMusicList
      //   title="我的音乐"
      //   musicList={ recommendMusic }
      //   choiceFlag={choiceFlag}
      //   selectedMusicIds={selectedMusicIds}
      // />
      <RenderMusicList
        title="推荐音乐"
        musicList={recommendMusic}
        choiceFlag={choiceFlag}
        selectedMusicIds={selectedMusicIds}
      />
    );
  }
}


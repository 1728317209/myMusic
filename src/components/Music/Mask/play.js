import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import './mask.css';

export default class Play extends Component {
  state = {
    //
  };

  render() {
    return (
      <div className="Play">
        <div className="play-close" onClick={() => this.props.onMaskShow(null)}>关闭</div>
        <div className="play-music-name">歌曲名称</div>
        <div>时间</div>
        <div className="play-progressBarArea">
          <img src={imgs.btn_pause} alt="" />
          <div className="play-back-div" />
        </div>
      </div>
    );
  }
}

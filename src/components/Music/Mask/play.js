import React, { Component } from 'react';
import Progress from './progressDemo';
import './mask.css';

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      music: null,
      bmt: null,
      emt: null
    };
  }

  componentWillMount() {
    const { music } = this.props;
    this.setState({
      music: { ...music },
      bmt: music.emt === 0 ? null : music.bmt,
      emt: music.emt === 0 ? null : music.emt
    });
  }

  render() {
    const { bmt, emt, music } = this.state;
    return (
      <div className="Play">
        <div className="play-close" onClick={() => this.props.onMaskShow(null)}>关闭</div>
        <div className="play-music-name">{music.name}</div>
        <Progress
          music={music}
          bmt={bmt}
          emt={emt}
          // onAudioChange={() => null}
          ProgressTimePosition="top"
        />
      </div>
    );
  }
}

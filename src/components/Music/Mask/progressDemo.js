import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import './mask.css';

export default class Play extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
      currentWidth: 0,
      music: null,
      isPlay: true,
      btnStatu: null,
      marginLeft: 0
    };
  }

  componentWillMount() {
    const { music } = this.props;
    this.renderImgs = {
      play: {
        true: imgs.btn_pause,
        false: imgs.btn_play
      }
    };
    this.setState({
      music: { ...music },
      btnStatu: {
        play: 'true'
      }
    });
  }

  componentDidMount() {
    if (this.props.bmt !== null) {
      this.audio.currentTime = this.props.bmt;
    }
    this.setState({
      currentTime: this.props.bmt,
      currentWidth: 0
    });
  }

  getProcessWidth = param1 => {
    if (this.audio) {
      const width = param1 / this.state.music.du * 100;
      return width;
    }
    return null;
  }

  getCutMaskPosition = key => `${this.getProcessWidth(this.props[key])}%`;

  getTimeTransform = time => {
    let second = Math.floor(time % 60);
    let minite = Math.floor(time / 60);
    if (second < 10) {
      second = `0${second}`;
    }
    if (minite < 10) {
      minite = `0${minite}`;
    }
    return `${minite}:${second}`;
  }

  isShowCutMask = key => {
    // debugger;
    if (!this.audio || this.props[key] === null) {
      return 'maskHide';
    }
    return 'maskShow';
  }

  handleAudioChange = () => {
    const { bmt, emt } = this.props;
    let currentWidth = 0;
    let marginLeft = 0;
    if (bmt === null) {
      currentWidth = `${this.getProcessWidth(this.state.currentTime)}%`;
    } else {
      currentWidth = `${this.getProcessWidth(this.state.currentTime - bmt)}%`;
      marginLeft = `${this.getProcessWidth(bmt)}%`;
      if (emt !== null) {
        currentWidth = this.state.currentTime > emt ? `${this.getProcessWidth(emt - bmt)}%` : currentWidth;
      }
    }
    if (emt !== null && this.audio.currentTime >= emt) {
      this.audio.currentTime = bmt;
    }
    if (bmt !== null && this.audio.currentTime <= bmt) {
      this.audio.currentTime = bmt;
    }
    if (this.props.onAudioChange) {
      this.props.onAudioChange(this.audio.currentTime);
    }
    this.setState({
      currentTime: this.audio.currentTime,
      marginLeft,
      currentWidth
    });
  }

  handlePlay = () => {
    if (this.state.isPlay) {
      this.audio.pause();
      this.setState({
        isPlay: !this.state.isPlay,
        btnStatu: {
          ...this.state.btnStatu,
          play: false
        }
      });
    } else {
      this.audio.play();
      this.setState({
        isPlay: !this.state.isPlay,
        btnStatu: {
          ...this.state.btnStatu,
          play: true
        }
      });
    }
  }

  handleMovingProgressWidth = rate => {
    const { bmt, emt } = this.props;
    let currentWidth = 0;
    let maxWidth = this.backPrecessWidth;
    if (bmt !== null) {
      currentWidth = (this.state.currentTime - bmt) / this.state.music.du * this.backPrecessWidth;
      if (emt !== null) {
        maxWidth = this.getProcessWidth(emt - bmt) / 100 * this.backPrecessWidth;
      }
    } else {
      currentWidth = this.state.currentTime / this.state.music.du * this.backPrecessWidth;
    }
    const newCurrentWidth = currentWidth + this.backPrecessWidth * rate;
    return bmt !== null && newCurrentWidth > maxWidth ? maxWidth : newCurrentWidth;
  }

  handleTouchStart = e => {
    this.startX = e.touches[0].clientX;
    this.audio.pause();
  }

  handleTouchMove = e => {
    const movingX = e.touches[0].clientX;
    const rate = (movingX - this.startX) / this.backPrecessWidth;
    this.setState({
      currentWidth: this.handleMovingProgressWidth(rate)
    });
  }

  handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    const rate = (endX - this.startX) / this.backPrecessWidth;
    const currentTime = this.state.currentTime + this.state.music.du * rate;
    this.audio.currentTime = currentTime;
    this.setState({
      currentTime: this.props.bmt !== null && currentTime > this.props.emt ? this.props.emt : currentTime,
      currentWidth: this.handleMovingProgressWidth(rate)
    });
    this.audio.play();
  }

  handleProgressClick = e => {
    const currentWidth = e.clientX - this.backOffsetLeft;
    const rate = currentWidth / this.backPrecessWidth;
    const currentTime = rate * this.state.music.du;
    this.audio.currentTime = currentTime;
    this.setState({
      currentTime
    });
  }

  renderProgressTime = position => {
    const { ProgressTimePosition, music } = this.props;
    if (position === ProgressTimePosition) {
      return <div>{`${this.getTimeTransform(this.state.currentTime)}/${this.getTimeTransform(music.du)}`}</div>;
    }
    return null;
  }

  render() {
    const { music } = this.props;
    const { btnStatu } = this.state;
    return (
      <div className="progressBarArea">
        {
          this.renderProgressTime('top')
        }
        <div className="progressBar">
          <img src={this.renderImgs.play[btnStatu.play]} className="pause-or-play" alt="" onClick={this.handlePlay} />
          <div
            className="back-div"
            ref={backPrecess => {
                  this.backPrecessWidth = backPrecess ? backPrecess.offsetWidth : null;
                  this.backOffsetLeft = backPrecess ? backPrecess.offsetLeft : null;
                }}
            onClick={this.handleProgressClick}
          >
            <img
              src={imgs.music_start}
              alt=""
              style={{ marginLeft: this.getCutMaskPosition('bmt') }}
              className={`cutImgInProgress ${this.isShowCutMask('bmt')}`}
            />
            <img
              src={imgs.music_finish}
              alt=""
              style={{ marginLeft: this.getCutMaskPosition('emt') }}
              className={`cutImgInProgress ${this.isShowCutMask('emt')}`}
            />
            <div
              style={{ marginLeft: this.state.marginLeft, width: this.state.currentWidth }}
              className="back-div-red"
            />
            <div
              className="circle"
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}
            />
          </div>
        </div>
        {
          this.renderProgressTime('bottom')
        }
        <audio
          ref={audio => { this.audio = audio; }}
          src={music.m_url}
          autoPlay="autoPlay"
          onTimeUpdate={this.handleAudioChange}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

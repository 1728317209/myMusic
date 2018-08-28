import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import './mask.css';

export default class Play extends Component {
  // 进度条组件
  constructor(props) {
    super(props);
    this.state = {
      music: null,
      isPlay: true,
      btnStatu: null,
      currentTime: null,
      currentWidth: 0,
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

  isShowCutMark = key => {
    // if (!this.audio || this.audio.readyState < 3 || this.props[key] === null) {
    if (!this.audio || this.props[key] === null) {
      return 'markHide';
    }
    return 'markShow';
  }

  handleAudioChange = () => {
    const { bmt, emt } = this.props;
    let currentWidth = 0;
    let marginLeft = 0;
    if (bmt === null) {
      currentWidth = `${this.getProcessWidth(this.state.currentTime)}%`;
    } else {
      marginLeft = `${this.getProcessWidth(bmt)}%`;
      currentWidth = `${this.getProcessWidth(this.state.currentTime - bmt)}%`;
      if (emt !== null) {
        currentWidth = this.state.currentTime > emt ? `${this.getProcessWidth(emt - bmt)}%` : currentWidth;
      }
    }
    if (bmt !== null && this.audio.currentTime <= bmt) {
      this.audio.currentTime = bmt;
    }
    if (emt !== null && this.audio.currentTime >= emt) {
      this.audio.currentTime = bmt;
    }
    if (this.props.onAudioChange) { // 如果父组件有onAudioChange方法(cut组件有、play组件没有)
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
    let maxWidth = this.backProgressWidth;
    if (bmt !== null) {
      currentWidth = (this.state.currentTime - bmt) / this.state.music.du * this.backProgressWidth;
      if (emt !== null) {
        maxWidth = this.getProcessWidth(emt - bmt) / 100 * this.backProgressWidth;
      }
    } else {
      currentWidth = this.state.currentTime / this.state.music.du * this.backProgressWidth;
    }
    const newCurrentWidth = currentWidth + this.backProgressWidth * rate;
    return bmt !== null && newCurrentWidth > maxWidth ? maxWidth : newCurrentWidth;
  }

  handleTouchStart = e => {
    this.startX = e.touches[0].clientX;
    this.audio.pause();
  }

  handleTouchMove = e => {
    const movingX = e.touches[0].clientX;
    const rate = (movingX - this.startX) / this.backProgressWidth;
    this.setState({
      currentWidth: this.handleMovingProgressWidth(rate)
    });
  }

  handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    const rate = (endX - this.startX) / this.backProgressWidth;
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
    const rate = currentWidth / this.backProgressWidth;
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

  renderProgressBar = () => {
    const { btnStatu } = this.state;
    return (
      <div className="progressBar">
        <img src={this.renderImgs.play[btnStatu.play]} className="pause-or-play" alt="" onClick={this.handlePlay} />
        <div
          className="back-div"
          ref={backProgress => {
                  this.backProgressWidth = backProgress ? backProgress.offsetWidth : null;
                  this.backOffsetLeft = backProgress ? backProgress.offsetLeft : null;
                }}
          onClick={this.handleProgressClick}
        >
          <img
            src={imgs.music_start}
            alt=""
            style={{ marginLeft: this.getCutMaskPosition('bmt') }}
            className={`cutImgInProgress ${this.isShowCutMark('bmt')}`}
          />
          <img
            src={imgs.music_finish}
            alt=""
            style={{ marginLeft: this.getCutMaskPosition('emt') }}
            className={`cutImgInProgress ${this.isShowCutMark('emt')}`}
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
    );
  }

  render() {
    const { music } = this.props;
    return (
      <div className="progressBarArea">
        {
          this.renderProgressTime('top')
        }
        {
          this.renderProgressBar()
        }
        {
          this.renderProgressTime('bottom')
        }
        <audio
          ref={audio => { this.audio = audio; }}
          src={music.m_url}
          autoPlay="autoPlay"
          loop
          onTimeUpdate={this.handleAudioChange}
        >
          Your browser does not support the audio element.
        </audio>
      </div>
    );
  }
}

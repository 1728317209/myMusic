import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import './mask.css';

export default class Progress extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: 0,
      currentWidth: 0,
      music: null,
      isPlay: true,
      btnStatu: null
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
    // this.setState({
    //   currentTime: this.audio.currentTime,
    //   currentWidth: this.audio.currentTime / this.audio.duration * this.backPrecessWidth
    // });
  }

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

  getProcessWidth = (param1, param2) => {
    if (!param2) {
      const width = Number(param1 / this.audio.duration * 100).toFixed(2);
      return width;
    }
    const width1 = Number(param1 / this.audio.duration * 100).toFixed(2);
    const width2 = Number(param2 / this.audio.duration * 100).toFixed(2);
    const width = width1 - width2;
    return width;
  }

  handleAudioChange = () => {
    if (this.state.music.bmt === 0) {
      this.process.style.width = `${this.getProcessWidth(this.state.currentTime)}%`;
    } else {
      this.process.style.width = `${this.getProcessWidth(this.state.currentTime, this.state.music.bmt)}%`;
    }
    if (this.state.music.emt !== 0 && this.audio.currentTime >= this.state.music.emt) {
      this.audio.currentTime = this.state.music.bmt;
    }
    this.setState({
      currentTime: this.audio.currentTime
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

  handleTouchStart = e => {
    this.startX = e.touches[0].clientX;
    this.audio.pause();
  }

  handleTouchMove = e => {
    const movingX = e.touches[0].clientX;
    const rate = (movingX - this.startX) / this.backPrecessWidth;
    const currentWidth = this.state.currentTime / this.state.music.du * this.backPrecessWidth;
    const newCurrentWidth = currentWidth + this.backPrecessWidth * rate;
    this.process.style.width = this.state.currentWidth;
    this.setState({
      currentWidth: newCurrentWidth
    });
  }

  handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    const rate = (endX - this.startX) / this.backPrecessWidth;
    const currentTime = this.state.currentTime + this.state.music.du * rate;
    const currentWidth = this.state.currentTime / this.state.music.du * this.backPrecessWidth;
    const newCurrentWidth = currentWidth + this.backPrecessWidth * rate;
    this.audio.currentTime = currentTime;
    this.setState({
      currentTime,
      currentWidth: newCurrentWidth
    });
    this.audio.play();
  }

  render() {
    const {
      music,
      currentTime,
      btnStatu,
      audio
      // progressStyle: { marginLeft, width }
    } = this.state;
    console.log('audio', audio);
    return (
      <div className="progressBarArea">
        <div className="progressBar">
          <img src={this.renderImgs.play[btnStatu.play]} className="pause-or-play" alt="" onClick={this.handlePlay} />
          <div
            className="back-div"
            ref={backPrecess => { this.backPrecessWidth = backPrecess ? backPrecess.offsetWidth : null; }}
          >
            <div
              ref={process => { this.process = process; }}
              style={{
                width: this.state.currentWidth ? this.state.currentWidth : 0
                // marginLeft
              }}
              className="back-div-red"
            />
            <div
              className="circle"
              onTouchStart={this.handleTouchStart}
              onTouchMove={this.handleTouchMove}
              onTouchEnd={this.handleTouchEnd}
            />
            <div>{audio ? audio.currentTime : 123}</div>
          </div>
        </div>
        <div>{`${this.getTimeTransform(currentTime)}/${this.getTimeTransform(music.du)}`}</div>
      </div>
    );
  }
}

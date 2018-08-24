import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import './mask.css';

export default class Cut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
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
      },
      start: {
        true: imgs.cut_music_start,
        false: imgs.cut_music_start_gray
      },
      clear: {
        true: imgs.cut_music_clear,
        false: imgs.cut_music_clear_gray
      },
      end: {
        true: imgs.cut_music_finish,
        false: imgs.cut_music_finish_gray
      }
    };
    this.setState({
      music: { ...music },
      btnStatu: {
        play: 'true',
        start: music.bmt === 0 ? 'true' : 'false',
        clear: music.bmt === 0 && music.emt === 0 ? 'false' : 'true',
        end: music.emt === 0 ? 'true' : 'false'
      }
    });
  }

  componentDidMount() {
    this.setState({
      currentTime: this.audio.currentTime
    });
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
    console.log('arguments.length', arguments.length, this.audio.duration, param1, param2);
    if (!param2) {
      const width = Number(param1 / this.audio.duration * 100).toFixed(2);
      console.log('width', width);
      return width;
    }
    const width1 = Number(param1 / this.audio.duration * 100).toFixed(2);
    const width2 = Number(param2 / this.audio.duration * 100).toFixed(2);
    const width = width1 - width2;
    console.log('width', width);
    return width;
  }

  handleAudioChange = () => {
    console.log('ssssssssssss');
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
        isPlay: false,
        renderImgs: {
          ...this.state.renderImgs,
          play: imgs.btn_play
        }
      });
    } else {
      this.audio.play();
      this.setState({
        isPlay: !this.state.isPlay,
        renderImgs: {
          ...this.state.renderImgs,
          play: imgs.btn_pause
        }
      });
    }
  }

  handleMarkStart = () => {
    this.process.style.marginLeft = `${this.getProcessWidth(this.state.currentTime)}%`;
    this.process.style.width = 0;
    this.setState({
      music: {
        ...this.state.music,
        bmt: this.audio.currentTime
      },
      btnStatu: {
        ...this.state.btnStatu,
        start: false,
        clear: true
      }
    });
  }

  handleMarkEnd = () => {
    this.setState({
      currentTime: this.audio.currentTime,
      music: {
        ...this.state.music,
        emt: this.audio.currentTime
      },
      btnStatu: {
        ...this.state.btnStatu,
        end: false,
        clear: true
      }
    });
  }

  handleClear = () => {
    this.process.style.marginLeft = 0;
    this.process.style.width = `${this.getProcessWidth(this.state.currentTime)}%`;
    this.setState({
      music: {
        ...this.state.music,
        bmt: 0,
        emt: 0
      },
      btnStatu: {
        ...this.state.btnStatu,
        start: true,
        end: true,
        clear: false
      }
    });
  }

  render() {
    const { music, currentTime, btnStatu } = this.state;
    return (
      <div className="Cut">
        <div className="other">
          <div className="opreate">
            <div className="opreate-item">
              <img src={this.renderImgs.start[btnStatu.start]} alt="" onClick={this.handleMarkStart} />
              <div>标记起点</div>
              <div>{this.getTimeTransform(music.bmt)}</div>
            </div>
            <div className="opreate-item">
              <img src={this.renderImgs.clear[btnStatu.clear]} alt="" onClick={this.handleClear} />
              <div>清除</div>
            </div>
            <div className="opreate-item">
              <img src={this.renderImgs.end[btnStatu.end]} alt="" onClick={this.handleMarkEnd} />
              <div>标记终点</div>
              <div>{this.getTimeTransform(music.du)}</div>
            </div>
          </div>
          <div className="progressBarArea">
            <div className="progressBar">
              <img src={this.renderImgs.play[btnStatu.play]} className="pause-or-play" alt="" onClick={this.handlePlay} />
              <div className="back-div">
                <div ref={process => { this.process = process; }} className="back-div-red" />
                <div className="circle" />
              </div>
            </div>
            <div>{`${this.getTimeTransform(currentTime)}/${this.getTimeTransform(music.du)}`}</div>
          </div>
        </div>
        <div className="cut-done" onClick={() => this.props.onMaskShow(null)}>完成</div>
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

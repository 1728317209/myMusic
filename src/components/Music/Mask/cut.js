import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import './mask.css';

export default class Cut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
      currentWidth: 0,
      music: null,
      isPlay: true,
      btnStatu: null,
      bmt: null,
      emt: null
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
      bmt: music.emt === 0 ? null : music.bmt,
      emt: music.emt === 0 ? null : music.emt,
      btnStatu: {
        play: 'true',
        start: music.emt === 0 ? 'true' : 'false',
        clear: music.emt === 0 ? 'false' : 'true',
        end: music.emt === 0 ? 'true' : 'false'
      }
    });
  }

  componentDidMount() {
    if (this.state.bmt !== null) {
      this.audio.currentTime = this.state.bmt;
      // this.process.style.width = 0;
      this.process.style.marginLeft = `${this.getProcessWidth(this.state.bmt)}%`;
    }
    this.setState({
      currentTime: this.audio.currentTime,
      currentWidth: this.audio.currentTime / this.state.music.du * this.backPrecessWidth
    });
  }


  getCutMaskPosition = key => `${this.getProcessWidth(this.state[key])}%`;


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

  getProcessWidth = param1 => {
    if (this.audio) {
      const width = param1 / this.state.music.du * 100;
      return width;
    }
    return null;
  }

  isShowCutMask = key => {
    if (!this.audio || this.state[key] === null) {
      return 'maskHide';
    }
    return 'maskShow';
  }

  handleAudioChange = () => {
    const { bmt, emt } = this.state;
    if (bmt === null) {
      this.process.style.width = `${this.getProcessWidth(this.state.currentTime)}%`;
    } else {
      this.process.style.width = `${this.getProcessWidth(this.state.currentTime - bmt)}%`;
    }
    if (emt !== null && this.audio.currentTime >= emt) {
      this.audio.currentTime = bmt;
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

  handleMarkStart = () => {
    this.process.style.marginLeft = `${this.getProcessWidth(this.state.currentTime)}%`;
    this.process.style.width = 0;
    this.setState({
      bmt: this.audio.currentTime,
      btnStatu: {
        ...this.state.btnStatu,
        start: false,
        clear: true
      }
    });
  }

  handleMarkEnd = () => {
    if (this.state.btm !== null) {
      this.setState({
        currentTime: this.audio.currentTime,
        emt: this.audio.currentTime,
        btnStatu: {
          ...this.state.btnStatu,
          end: false,
          clear: true
        }
      });
    } else {
      alert('先标记起点');
    }
  }

  handleClear = () => {
    this.process.style.marginLeft = 0;
    this.process.style.width = `${this.getProcessWidth(this.state.currentTime)}%`;
    this.setState({
      bmt: null,
      emt: null,
      btnStatu: {
        ...this.state.btnStatu,
        start: true,
        end: true,
        clear: false
      }
    });
  }

  handleTouchStart = e => {
    this.startX = e.touches[0].clientX;
    this.audio.pause();
  }

  handleTouchMove = e => {
    const movingX = e.touches[0].clientX;
    const rate = (movingX - this.startX) / this.backPrecessWidth;
    let currentWidth = 0;
    if (this.state.bmt !== null) {
      currentWidth = (this.state.currentTime - this.state.bmt) / this.state.music.du * this.backPrecessWidth;
    } else {
      currentWidth = this.state.currentTime / this.state.music.du * this.backPrecessWidth;
    }
    const newCurrentWidth = currentWidth + this.backPrecessWidth * rate;
    const maxWidth = this.getProcessWidth(this.state.emt - this.state.bmt) / 100 * this.backPrecessWidth;
    console.log('currentWidth', this.state.currentWidth);
    this.setState({
      currentWidth: this.state.bmt !== null && newCurrentWidth > maxWidth ? maxWidth : newCurrentWidth
      // currentWidth: newCurrentWidth
    });
  }

  handleTouchEnd = e => {
    const endX = e.changedTouches[0].clientX;
    const rate = (endX - this.startX) / this.backPrecessWidth;
    const currentTime = this.state.currentTime + this.state.music.du * rate;
    this.audio.currentTime = this.state.bmt !== null && currentTime > this.state.emt ? this.state.emt : currentTime;
    this.setState({
      currentTime: this.state.bmt !== null && currentTime > this.state.emt ? this.state.emt : currentTime,
      currentWidth: 0
    });
    this.audio.play();
  }

  render() {
    const {
      music, currentTime, btnStatu, bmt, emt
    } = this.state;
    return (
      <div className="Cut">
        <div className="other">
          <div className="opreate">
            <div className="opreate-item">
              <img src={this.renderImgs.start[btnStatu.start]} alt="" onClick={this.handleMarkStart} />
              <div>标记起点</div>
              <div>{this.getTimeTransform(bmt)}</div>
            </div>
            <div className="opreate-item">
              <img src={this.renderImgs.clear[btnStatu.clear]} alt="" onClick={this.handleClear} />
              <div>清除</div>
            </div>
            <div className="opreate-item">
              <img src={this.renderImgs.end[btnStatu.end]} alt="" onClick={this.handleMarkEnd} />
              <div>标记终点</div>
              <div>{this.audio ? this.getTimeTransform(this.state.music.du) : '00:00'}</div>
            </div>
          </div>
          <div className="progressBarArea">
            <div className="progressBar">
              <img src={this.renderImgs.play[btnStatu.play]} className="pause-or-play" alt="" onClick={this.handlePlay} />
              <div
                className="back-div"
                ref={backPrecess => { this.backPrecessWidth = backPrecess ? backPrecess.offsetWidth : null; }}
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
                  ref={process => { this.process = process; }}
                  style={{ width: this.state.currentWidth ? this.state.currentWidth : 0 }}
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

import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import Progress from './progressDemo';
import './mask.css';

export default class Cut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      btnStatu: null,
      currentTime: null,
      bmt: null,
      emt: null
    };
  }

  componentWillMount() {
    const { music } = this.props;
    this.renderImgs = {
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
        start: music.emt === 0 ? 'true' : 'false',
        clear: music.emt === 0 ? 'false' : 'true',
        end: music.emt === 0 ? 'true' : 'false'
      }
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

  isShowCutMask = key => {
    if (!this.audio || this.state[key] === null) {
      return 'maskHide';
    }
    return 'maskShow';
  }

  handleMarkStart = () => {
    this.setState({
      bmt: this.state.currentTime,
      btnStatu: {
        ...this.state.btnStatu,
        start: false,
        clear: true
      },
      progressStyle: {
        ...this.state.progressStyle,
        width: 0,
        marginLeft: `${this.state.currentTime / this.state.music.du * 100}%`
      }
    });
  }

  handleMarkEnd = () => {
    if (this.state.bmt === null) {
      this.props.onMessageShow('请先标记起点！');
    } else if (this.state.currentTime - this.state.bmt >= 10) {
      this.setState({
        currentTime: this.state.currentTime,
        emt: this.state.currentTime,
        btnStatu: {
          ...this.state.btnStatu,
          end: false,
          clear: true
        }
      });
      this.handleCutMusic();
    } else {
      this.props.onMessageShow('截取音乐长度不能小于10S哦！');
    }
  }

  handleClear = () => {
    this.setState({
      bmt: null,
      emt: null,
      btnStatu: {
        ...this.state.btnStatu,
        start: true,
        end: true,
        clear: false
      },
      progressStyle: {
        ...this.state.progressStyle,
        width: `${this.state.currentTime / this.state.music.du * 100}%`,
        marginLeft: 0
      }
    });
  }

  handleCutMusic = () => {
    const { id, emt } = this.state.music;
    if (this.state.emt !== null && this.state.emt !== emt) {
      this.props.onCutMusic(id, this.state.bmt, this.state.emt);
      this.setState({
        music: {
          ...this.state.music,
          bmt: this.state.bmt,
          emt: this.state.emt
        }
      });
    }
    return null;
  }

  handleDone = () => {
    this.props.onMaskShow(null);
    this.handleCutMusic();
  }

  handleAudioChange = currentTime => {
    this.setState({
      currentTime
    });
  }

  renderCutMark = () => {
    const { btnStatu, bmt, emt } = this.state;
    return (
      <div className="opreate">
        <div className="opreate-item">
          <img src={this.renderImgs.start[btnStatu.start]} alt="" onClick={this.handleMarkStart} />
          <div>标记起点</div>
          <div>{bmt !== null ? this.getTimeTransform(bmt) : '00:00'}</div>
        </div>
        <div className="opreate-item">
          <img src={this.renderImgs.clear[btnStatu.clear]} alt="" onClick={this.handleClear} />
          <div>清除</div>
        </div>
        <div className="opreate-item">
          <img src={this.renderImgs.end[btnStatu.end]} alt="" onClick={this.handleMarkEnd} />
          <div>标记终点</div>
          <div>{emt !== null ? this.getTimeTransform(emt) : this.getTimeTransform(this.state.music.du)}</div>
        </div>
      </div>
    );
  }

  render() {
    const { bmt, emt, music } = this.state;
    return (
      <div className="Cut">
        <div className="other">
          {
            this.renderCutMark()
          }
          <Progress
            music={music}
            bmt={bmt}
            emt={emt}
            onAudioChange={this.handleAudioChange}
            ProgressTimePosition="bottom" // 进度条时间的位置 bottom or top
          />
        </div>
        <div className="cut-done" onClick={this.handleDone}>完成</div>
      </div>
    );
  }
}

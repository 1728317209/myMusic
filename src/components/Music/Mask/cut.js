import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import Progress from './progress';
import './mask.css';

export default class Cut extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentTime: null,
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
      currentTime: this.audio.currentTime,
      currentWidth: this.audio.currentTime / this.audio.duration * this.backPrecessWidth
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
    if (this.state.music.bem) {
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
    } else {
      alert('先标记起点');
    }
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
              <div
                className="back-div"
                ref={backPrecess => { this.backPrecessWidth = backPrecess ? backPrecess.offsetWidth : null; }}
              >
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

// import React, { Component } from 'react';
// import * as imgs from '../../../Resource/Resource';
// import Progress from './progress';
// import './mask.css';

// export default class Cut extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       currentTime: 0,
//       music: null,
//       btnStatu: null,
//       progressStyle: {
//         marginLeft: 0,
//         width: 0
//       }
//     };
//   }

//   componentWillMount() {
//     const { music } = this.props;
//     this.renderImgs = {
//       start: {
//         true: imgs.cut_music_start,
//         false: imgs.cut_music_start_gray
//       },
//       clear: {
//         true: imgs.cut_music_clear,
//         false: imgs.cut_music_clear_gray
//       },
//       end: {
//         true: imgs.cut_music_finish,
//         false: imgs.cut_music_finish_gray
//       }
//     };
//     this.setState({
//       music: { ...music },
//       btnStatu: {
//         start: music.bmt === 0 ? 'true' : 'false',
//         clear: music.bmt === 0 && music.emt === 0 ? 'false' : 'true',
//         end: music.emt === 0 ? 'true' : 'false'
//       }
//     });
//   }

//   componentDidMount() {
//     console.log(this.audio);
//     this.setState({
//       audio: this.audio,
//       currentTime: this.audio.currentTime
//     });
//   }

//   getProcessWidth = (param1, param2) => {
//     if (!param2) {
//       const width = Number(param1 / this.audio.duration * 100).toFixed(2);
//       return width;
//     }
//     const width1 = Number(param1 / this.audio.duration * 100).toFixed(2);
//     const width2 = Number(param2 / this.audio.duration * 100).toFixed(2);
//     const width = width1 - width2;
//     return width;
//   }

//   getTimeTransform = time => {
//     let second = Math.floor(time % 60);
//     let minite = Math.floor(time / 60);
//     if (second < 10) {
//       second = `0${second}`;
//     }
//     if (minite < 10) {
//       minite = `0${minite}`;
//     }
//     return `${minite}:${second}`;
//   }

//   handleMarkStart = () => {
//     this.setState({
//       music: {
//         ...this.state.music,
//         bmt: this.audio.currentTime
//       },
//       btnStatu: {
//         ...this.state.btnStatu,
//         start: false,
//         clear: true
//       },
//       progressStyle: {
//         ...this.state.progressStyle,
//         marginLeft: `${this.getProcessWidth(this.state.currentTime)}%`,
//         width: 0
//       }
//     });
//   }

//   handleMarkEnd = () => {
//     this.setState({
//       currentTime: this.audio.currentTime,
//       music: {
//         ...this.state.music,
//         emt: this.audio.currentTime
//       },
//       btnStatu: {
//         ...this.state.btnStatu,
//         end: false,
//         clear: true
//       }
//     });
//   }

//   handleClear = () => {
//     this.setState({
//       music: {
//         ...this.state.music,
//         bmt: 0,
//         emt: 0
//       },
//       btnStatu: {
//         ...this.state.btnStatu,
//         start: true,
//         end: true,
//         clear: false
//       },
//       progressStyle: {
//         ...this.state.progressStyle,
//         marginLeft: 0,
//         width: `${this.getProcessWidth(this.state.currentTime)}%`
//       }
//     });
//   }

//   render() {
//     const {
//       music, currentTime, btnStatu, progressStyle
//     } = this.state;
//     return (
//       <div className="Cut">
//         <audio
//           ref={audio => { this.audio = audio; }}
//           src={music.m_url}
//           autoPlay="autoPlay"
//           onTimeUpdate={this.handleAudioChange}
//         >
//           Your browser does not support the audio element.
//         </audio>
//         <div className="other">
//           <div className="opreate">
//             <div className="opreate-item">
//               <img src={this.renderImgs.start[btnStatu.start]} alt="" onClick={this.handleMarkStart} />
//               <div>标记起点</div>
//               <div>{this.getTimeTransform(music.bmt)}</div>
//             </div>
//             <div className="opreate-item">
//               <img src={this.renderImgs.clear[btnStatu.clear]} alt="" onClick={this.handleClear} />
//               <div>清除</div>
//             </div>
//             <div className="opreate-item">
//               <img src={this.renderImgs.end[btnStatu.end]} alt="" onClick={this.handleMarkEnd} />
//               <div>标记终点</div>
//               <div>{this.getTimeTransform(music.du)}</div>
//             </div>
//           </div>
//           <Progress
//             music={music}
//             currentTime={currentTime}
//             btnStatu={btnStatu}
//             progressStyle={progressStyle}
//             audio={this.state.audio}
//           />
//         </div>
//         <div className="cut-done" onClick={() => this.props.onMaskShow(null)}>完成</div>
//       </div>
//     );
//   }
// }

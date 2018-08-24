import React, { Component } from 'react';
import Message from '../Message/Message';
import { footState } from './footState';
import './index.css';

export default class Foot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...footState,
      message: null
    };
  }

  // componentWillMount() {
  //   this.itemClickFuc = {
  //     active: this.props.onMaskShow,
  //     notActive: {
  //       true: { // 单选状态
  //         rename: this.showMessage.bind(this, '漂流瓶中的音乐不能重命名哦！')
  //       },
  //       false: { // 多选状态
  //         play: this.showMessage.bind(this, '多选状态下不能播放哦！'),
  //         rename: this.showMessage.bind(this, '多选状态下不能重命名哦！'),
  //         cut: this.showMessage.bind(this, '多选状态下不能截取哦！'),
  //         share: this.showMessage.bind(this, '多选状态下不能分享哦！')
  //       }
  //     }
  //   };
  // }

  getItemStatus = () => {
    const { selectedMusicIds, choiceFlag, currentMusic } = this.props;
    if (choiceFlag) { // 单选
      if (selectedMusicIds.length === 0) { // 没有选中歌曲
        return {
          play: 'notActive',
          rename: 'notActive',
          cut: 'notActive',
          share: 'notActive',
          delete: 'notActive'
        };
      }
      // 有选中歌曲
      const itemStatus = {
        play: 'active',
        rename: null,
        cut: 'active',
        share: 'active',
        delete: 'active'
      };
      if (currentMusic && currentMusic.plp === undefined) {
        itemStatus.rename = 'active';
      } else {
        itemStatus.rename = 'notActive';
      }
      return itemStatus;
    } // 多选
    const itemStatus = {
      play: 'notActive',
      rename: 'notActive',
      cut: 'notActive',
      share: 'notActive',
      delete: 'active'
    };
    return itemStatus;
  }

  getOnClickFuc = (status, item) => {
    console.log(this.props.choiceFlag);
    if (status === 'active') {
      return this.props.onMaskShow(item);
    } else if (!this.props.choiceFlag) {
      switch (item) {
        case 'play': {
          return this.showMessage('多选状态下不能播放哦！');
        }
        case 'rename': {
          return this.showMessage('多选状态下不能重命名哦！');
        }
        case 'cut': {
          return this.showMessage('多选状态下不能截取哦！');
        }
        case 'share': {
          return this.showMessage('多选状态下不能分享哦！');
        }
        default:
          break;
      }
    } else if (item === 'rename') {
      return this.showMessage('漂流瓶中的音乐不能重命名哦！');
    }
    return null;
  }

  showMessage = message => {
    console.log('lllllllllllllllllllll');
    this.setState({
      message
    });
  }

  renderFoot = (itemStatus, itemClickFuc) => this.state.list.map((item, idx) => {
    const { entities } = this.state;
    const status = itemStatus[item];
    // console.log('itemClickFuc[status]', itemClickFuc[status]);
    return (
      <div className="Foot-item" key={idx} onClick={() => this.getOnClickFuc(status, item)}>
        <img src={entities[item].img[status]} alt="" />
        <div>{entities[item].title}</div>
      </div>
    );
  })

  render() {
    const itemStatus = this.getItemStatus();
    return (
      <div className="Foot">
        {
          this.renderFoot(itemStatus, this.itemClickFuc)
        }
        <Message
          message={this.state.message}
        />
      </div>
    );
  }
}

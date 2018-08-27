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
    if (selectedMusicIds.length === 0) {
      itemStatus.delete = 'notActive';
    }
    return itemStatus;
  }

  getOnClickFuc = (status, item) => {
    const { onMessageShow } = this.props;
    if (status === 'active') {
      return this.props.onMaskShow(item);
    } else if (this.props.selectedMusicIds.length === 0) {
      return onMessageShow('您还没有选中音乐哦！');
    } else if (!this.props.choiceFlag) {
      switch (item) {
        case 'play': {
          return onMessageShow('多选状态下不能播放哦！');
        }
        case 'rename': {
          return onMessageShow('多选状态下不能重命名哦！');
        }
        case 'cut': {
          return onMessageShow('多选状态下不能截取哦！');
        }
        case 'share': {
          return onMessageShow('多选状态下不能分享哦！');
        }
        default:
          break;
      }
    } else if (item === 'rename') {
      return onMessageShow('漂流瓶中的音乐不能重命名哦！');
    }
    return null;
  }

  renderFoot = itemStatus => this.state.list.map((item, idx) => {
    const { entities } = this.state;
    const status = itemStatus[item];
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
      </div>
    );
  }
}

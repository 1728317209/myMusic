import React, { Component } from 'react';
import { footState } from './footState';
import './index.css';

export default class Foot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...footState
    };
  }

  getItemStatus = () => {
    const {
      selectedMusicIds,
      selectedMusicTypes,
      choiceFlag,
      currentMusic
    } = this.props;
    const itemStatus = {
      play: 'notActive',
      rename: 'notActive',
      cut: 'notActive',
      share: 'notActive',
      delete: 'notActive'
    };
    if (choiceFlag) { // 单选
      if (selectedMusicIds.length === 0) {
        //
      } else if (selectedMusicTypes.includes('推荐音乐')) { // 有选中歌曲 包括推荐歌曲 只能播放
        itemStatus.play = 'active';
      } else if (currentMusic && currentMusic.plp === undefined) { // 有选中歌曲 不包括推荐歌曲 没有plp标记
        Object.keys(itemStatus).forEach(item => {
          itemStatus[item] = 'active';
        });
      } else {
        Object.keys(itemStatus).forEach(item => { // 有选中歌曲 不包括推荐歌曲 有plp标记 不能重命名
          if (item === 'rename') {
            itemStatus[item] = 'notActive';
          } else {
            itemStatus[item] = 'active';
          }
        });
      }
    } else if (selectedMusicIds.length === 0 || selectedMusicTypes.includes('推荐音乐')) { // 多选 没有选中或包含推荐音乐
      Object.keys(itemStatus).forEach(item => {
        itemStatus[item] = 'notActive';
      });
    } else {
      Object.keys(itemStatus).forEach(item => {
        if (item === 'delete') {
          itemStatus[item] = 'active';
        } else {
          itemStatus[item] = 'notActive';
        }
      });
    }
    return itemStatus;
  }

  getOnClickFuc = (status, item) => {
    const { onMessageShow, selectedMusicTypes } = this.props;
    if (status === 'active') { // 如果item是 active 状态
      return this.props.onMaskShow(item);
    } else if (this.props.selectedMusicIds.length === 0) { // 如果item是 notActive 状态, 还没有选中音乐
      return onMessageShow('您还没有选中音乐哦！');
    } else if (!this.props.choiceFlag) { // 多选状态
      const obj = {
        play: '多选状态下不能播放哦！',
        rename: '多选状态下不能重命名哦！',
        cut: '多选状态下不能截取哦！',
        share: '多选状态下不能分享哦！',
        delete: '推荐音乐不能删除哦！'
      };
      return onMessageShow(obj[item]);
    } else if (selectedMusicTypes.includes('推荐音乐')) { // 单选状态 如果选中推荐音乐
      const obj = {
        rename: '【推荐音乐】不能重命名哦！',
        cut: '【推荐音乐】不能截取哦！',
        share: '【推荐音乐】不能分享哦！',
        delete: '【推荐音乐】不能删除哦！'
      };
      return onMessageShow(obj[item]);
    } else if (item === 'rename') { // 如果没有选中推荐音乐
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
          this.renderFoot(itemStatus)
        }
      </div>
    );
  }
}

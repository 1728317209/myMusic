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

  componentWillMount() {
    this.itemClickFuc = {
      active: this.props.onMaskShow,
      notActive: () => alert('no no no')
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
    return itemStatus;
  }

  renderFoot = (itemStatus, itemClickFuc) => this.state.list.map((item, idx) => {
    const { entities } = this.state;
    const status = itemStatus[item];
    return (
      <div className="Foot-item" key={idx} onClick={() => itemClickFuc[status](item)}>
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

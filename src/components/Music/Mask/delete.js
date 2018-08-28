import React, { Component } from 'react';
import './mask.css';

export default class Delete extends Component {
  getMessage = () => {
    const { choiceFlag, currentMusic, selectedMusicIds } = this.props;
    if (choiceFlag) { // 单选
      return `确定要删除【${currentMusic.name}】这首音乐吗？`;
    }
    return `确定要删除这${selectedMusicIds.length}首音乐吗？`;
  }

  render() {
    return (
      <div className="Delete">
        <div className="textArea">{this.getMessage()}</div>
        <div className="del-btn">
          <div className="del-cancle" onClick={() => this.props.onMaskShow(null)}>取消</div>
          <div className="del-sure" onClick={this.props.onDeleteMusic}>确定</div>
        </div>
      </div>
    );
  }
}

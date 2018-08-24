import React, { Component } from 'react';
import './mask.css';

export default class Delete extends Component {
  state = {
    //
  };

  render() {
    return (
      <div className="Delete">
        <div className="textArea">确定删除水木年华-一生有你.mp3这首音乐吗？</div>
        <div className="del-btn">
          <div className="del-cancle" onClick={() => this.props.onMaskShow(null)}>取消</div>
          <div className="del-sure" onClick={this.props.onDeleteMusic}>确定</div>
        </div>
      </div>
    );
  }
}

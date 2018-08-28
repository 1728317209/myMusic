import React, { Component } from 'react';
import './mask.css';

export default class Rename extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputVal: ''
    };
  }

  handleInputChange = e => {
    this.setState({
      inputVal: e.target.value
    });
  }

  render() {
    return (
      <div className="Delete">
        <div className="renameArea">
          <div>请输入新的音乐名称：</div>
          <input
            className="rename-input"
            type="text"
            defaultValue={this.props.currentMusic.name}
            onChange={this.handleInputChange}
          />
        </div>
        <div className="del-btn">
          <div className="del-cancle" onClick={() => this.props.onMaskShow(null)}>取消</div>
          <div className="del-sure" onClick={() => this.props.onRenameMusic(this.state.inputVal)}>确定</div>
        </div>
      </div>
    );
  }
}

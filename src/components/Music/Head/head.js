import React, { Component } from 'react';
import * as imgs from '../../../Resource/Resource';
import './index.css';

export default class Head extends Component {
  state = {
    //
  }
  handleReturn = () => {
    window.alert('Go Back');
  }
  render() {
    const { user } = this.props;
    const nick = !user ? null : user[0].nick; //  || user.length === 0
    return (
      <div className="Head">
        <div>
          <div className="return" onClick={this.handleReturn}>
            <img src={imgs.return_png} alt="" />
            <span>影集制作</span>
          </div>
        </div>
        <div className="nick">
          <span>{nick}</span>
        </div>
        <div className="done">
          <span>完成</span>
        </div>
      </div>
    );
  }
}

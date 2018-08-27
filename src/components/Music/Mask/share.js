import React, { Component } from 'react';
import './mask.css';

export default class Share extends Component {
  state = {
    //
  };

  render() {
    const { currentMusic } = this.props;
    return (
      <div className="Share" >
        <div className="share-textArea">送出 {currentMusic.name} ^v^</div>
      </div>
    );
  }
}

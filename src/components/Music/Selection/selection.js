import React, { Component } from 'react';
import './index.css';

export default class Selection extends Component {
  state = {
    //
  }

  render() {
    const { choiceFlag, onChoice } = this.props;
    return (
      <div className="Selection">
        <div className="select-div">
          <div className="big-select-btn">
            <div className={`small-select-btn single-${choiceFlag}`} onClick={() => onChoice(true)} />
          </div>
          <span>单选</span>
        </div>
        <div className="select-div">
          <div className="big-select-btn">
            <div className={`small-select-btn multiple-${choiceFlag}`} onClick={() => onChoice(false)} />
          </div>
          <span>多选</span>
        </div>
      </div>
    );
  }
}

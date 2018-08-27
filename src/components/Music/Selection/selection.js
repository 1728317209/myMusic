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
        <div className="select-div" onClick={() => onChoice(true)}>
          <div className="big-select-btn" >
            <div className={`small-select-btn single-${choiceFlag}`} />
          </div>
          <span>单选</span>
        </div>
        <div className="select-div" onClick={() => onChoice(false)}>
          <div className="big-select-btn">
            <div className={`small-select-btn multiple-${choiceFlag}`} />
          </div>
          <span>多选</span>
        </div>
      </div>
    );
  }
}

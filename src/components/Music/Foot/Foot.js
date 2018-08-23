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

  handleClick = key => {
    const { current } = this.state;
    this.setState({
      entities: {
        ...this.state.entities,
        [key]: {
          ...this.state.entities[key],
          status: 'selected'
        },
        [current]: {
          ...this.state.entities[current],
          status: 'unSelected'
        }
      },
      current: key
    });
  }

  renderFoot = () => this.state.list.map((item, idx) => {
    const { entities } = this.state;
    return (
      <div className="Foot-item" key={idx} onClick={() => this.handleClick(item)}>
        <img src={entities[item].img[entities[item].status]} alt="" />
        <div>{entities[item].title}</div>
      </div>
    );
  })

  render() {
    return (
      <div className="Foot">
        {
          this.renderFoot()
        }
      </div>
    );
  }
}

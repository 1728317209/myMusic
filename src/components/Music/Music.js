import React, { Component } from 'react';
import Head from './Head/head';
import TabBar from './TabBar/tabBar';

export default class Music extends Component {
  state = {
    //
  }

  render() {
    const {
      user,
      myMusic,
      recommendMusic,
      Actions
    } = this.props;
    return (
      <div className="Music">
        <Head
          user={user}
        />
        <TabBar
          myMusic={myMusic}
          recommendMusic={recommendMusic}
          Actions={Actions}
        />
      </div>
    );
  }
}

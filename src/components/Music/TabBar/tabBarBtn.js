import React, { Component } from 'react';
import { tabBarBtnState } from './tabBarBtnState';
import './index.css';

export default class TabBarBtn extends Component {
  getRenderInfo = () => {
    const { switchTabFlag } = this.props;
    const { current } = tabBarBtnState;
    if (switchTabFlag === current) {
      return tabBarBtnState;
    }
    tabBarBtnState.entities[switchTabFlag].status = 'selected';
    tabBarBtnState.entities[current].status = 'unSelected';
    tabBarBtnState.current = switchTabFlag;
    return tabBarBtnState;
  }

  renderTabBarBtn = renderInfo => {
    const { onSelectTab } = this.props;
    const { list, entities, classInfo } = renderInfo;
    return list.map((item, idx) => {
      const { status } = entities[item];
      return (
        <div className={item} onClick={() => onSelectTab(item)} key={idx}>
          <div className="item">
            <img src={entities[item].img[status]} alt="" />
            <span className={classInfo[status].spanClass}>我的音乐</span>
          </div>
          <div className={`bottom ${classInfo[status].bottomClass}`} />
        </div>
      );
    });
  }
  render() {
    const renderInfo = this.getRenderInfo();
    return (
      <div>
        <div className="TabBarBtn">
          {
            this.renderTabBarBtn(renderInfo)
          }
        </div>
        <hr />
      </div>
    );
  }
}

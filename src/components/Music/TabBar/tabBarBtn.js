import React, { Component } from 'react';
import { tabBarBtnState } from './tabBarBtnState';
import './index.css';

export default class TabBarBtn extends Component {
  getRenderInfo = () => {
    // 根据props中的switchTabFlag来调整renderInfo
    const { switchTabFlag } = this.props;
    const { currentItem } = tabBarBtnState;
    if (switchTabFlag === currentItem) {
      return tabBarBtnState;
    }
    tabBarBtnState.entities[switchTabFlag].status = 'selected';
    tabBarBtnState.entities[currentItem].status = 'unSelected';
    tabBarBtnState.currentItem = switchTabFlag;
    return tabBarBtnState;
  }

  renderTabBarBtn = renderInfo => {
    const { onSwitchTab } = this.props;
    const { list, entities, classNameInfo } = renderInfo;
    return list.map((item, idx) => {
      const { status } = entities[item];
      return (
        <div className={item} onClick={() => onSwitchTab(item)} key={idx}>
          <div className="item">
            <img src={entities[item].img[status]} alt="" />
            <span className={classNameInfo[status].spanClass}>{entities[item].title}</span>
          </div>
          <div className={`bottom ${classNameInfo[status].bottomClass}`} />
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

import React, { Component } from 'react';
import TabBarBtn from './tabBarBtn';
import TabBarBody from './tabBarBody';
import './index.css';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchTabFlag: 'mine', // 选择的哪一个TabBar,默认选中我的音乐
      choiceFlag: true, // 单选还是多选，true：单选、flase：多选
      selectedMusicIds: [] // 选中的歌曲ids
    };
  }

  handleSelectTab = key => { // 选择的哪一个TabBar
    this.setState({
      switchTabFlag: key
    });
  }

  handleChoice = key => { // 单选还是多选
    if (key && !this.state.choiceFlag) { // 多选转单选
      this.setState({
        selectedMusicIds: [this.state.selectedMusicIds[0]],
        choiceFlag: key
      });
    } else {
      this.setState({
        choiceFlag: key
      });
    }
  }

  handleSelectMusic = id => {
    const newSelectedMusicIds = [...this.state.selectedMusicIds];
    if (this.state.choiceFlag) { // 如果是单选状态
      if (newSelectedMusicIds.includes(id)) { // 如果已选中
        this.setState({
          selectedMusicIds: []
        });
      } else { // 如果未选中
        this.setState({
          selectedMusicIds: [id]
        });
      }
    } else if (newSelectedMusicIds.includes(id)) { // 如果是多选状态 已选中
      const idx = newSelectedMusicIds.indexOf(id);
      newSelectedMusicIds.splice(idx, 1);
      this.setState({
        selectedMusicIds: newSelectedMusicIds
      });
    } else if (newSelectedMusicIds.length < 5) { // 如果是多选状态 未选中 还装得下
      newSelectedMusicIds.push(id);
      this.setState({
        selectedMusicIds: newSelectedMusicIds
      });
    }
    return null; // 如果是多选状态 未选中 装不下了
  }

  render() {
    const { myMusic, recommendMusic } = this.props;
    return (
      <div className="TabBar">
        <TabBarBtn
          switchTabFlag={this.state.switchTabFlag}
          onSelectTab={this.handleSelectTab}
        />
        <TabBarBody
          switchTabFlag={this.state.switchTabFlag}
          choiceFlag={this.state.choiceFlag}
          onChoice={this.handleChoice}
          myMusic={myMusic}
          recommendMusic={recommendMusic}
          selectedMusicIds={this.state.selectedMusicIds}
          onSelectMusic={this.handleSelectMusic}
        />
      </div>
    );
  }
}

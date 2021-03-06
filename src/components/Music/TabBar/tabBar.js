import React, { Component } from 'react';
import TabBarBtn from './tabBarBtn';
import TabBarBody from './tabBarBody';
import Mask from '../Mask/mask';
import Message from '../Message/Message';
import './index.css';

export default class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      switchTabFlag: 'mine', // 选择的哪一个TabBar,默认选中我的音乐
      choiceFlag: true, // 单选还是多选，true：单选、flase：多选
      selectedMusicIds: [], // 选中的歌曲ids
      selectedMusicTypes: [], // 选中歌曲所在列表的key，我的音乐:0、推荐音乐:1
      isMaskActive: false,
      maskItem: null,
      message: null
    };
  }

  handleSelectTab = key => { // 选择的哪一个TabBar
    this.setState({
      message: null,
      switchTabFlag: key
    });
  }

  handleChoice = key => { // 单选还是多选
    if (key && !this.state.choiceFlag) { // 多选转单选
      this.setState({
        message: null,
        selectedMusicIds: this.state.selectedMusicIds.length === 0 ? [] : [this.state.selectedMusicIds[0]],
        selectedMusicTypes: this.state.selectedMusicTypes.length === 0 ? [] : [this.state.selectedMusicTypes[0]],
        choiceFlag: key
      });
      this.props.Actions.storeSelectedMusic(this.state.selectedMusicIds);
    } else {
      this.setState({
        message: null,
        choiceFlag: key
      });
    }
  }

  handleSetSelectedMusicToState = (ids, listKeys) => {
    this.setState({
      message: null,
      selectedMusicIds: ids,
      selectedMusicTypes: listKeys
    });
    this.props.Actions.storeSelectedMusic(ids);
  }

  handleSelectMusic = (id, listKey) => {
    const newSelectedMusicIds = [...this.state.selectedMusicIds];
    const newSelectedMusicTypes = [...this.state.selectedMusicTypes];
    if (this.state.choiceFlag) { // 如果是单选状态
      this.handleSetSelectedMusicToState([id], [listKey]);
    } else if (newSelectedMusicIds.includes(id)) { // 如果是多选状态 已选中
      const idx = newSelectedMusicIds.indexOf(id);
      newSelectedMusicIds.splice(idx, 1);
      newSelectedMusicTypes.splice(idx, 1);
      this.handleSetSelectedMusicToState(newSelectedMusicIds, newSelectedMusicTypes);
    } else if (newSelectedMusicIds.length < 5) { // 如果是多选状态 未选中 还装得下
      newSelectedMusicIds.push(id);
      newSelectedMusicTypes.push(listKey);
      this.handleSetSelectedMusicToState(newSelectedMusicIds, newSelectedMusicTypes);
    } else {
      this.showMessage('最多选五首哦');
    }
    return null; // 如果是多选状态 未选中 装不下了
  }

  handleDeleteMusic = () => {
    const { Actions } = this.props;
    Actions.deleteMusic(this.state.selectedMusicIds);
    this.setState({
      message: null,
      selectedMusicIds: [],
      selectedMusicTypes: []
    });
    this.handleMaskShow(null);
  }

  handleMaskShow = maskItem => { // 返回值可以是某个item或null
    this.setState({
      message: null,
      isMaskActive: !this.state.isMaskActive,
      maskItem
    });
  }

  handleRenameMusic = newName => {
    this.props.Actions.renameMusic(this.state.selectedMusicIds[0], newName);
    this.handleMaskShow(null);
  }

  showMessage = message => {
    this.setState({
      message
    });
  }

  render() {
    const {
      myMusic, recommendMusic, currentMusic, Actions
    } = this.props;
    const {
      switchTabFlag, choiceFlag, isMaskActive, maskItem, message, selectedMusicIds, selectedMusicTypes
    } = this.state;
    return (
      <div className="TabBar">
        <TabBarBtn
          switchTabFlag={switchTabFlag}
          onSwitchTab={this.handleSelectTab}
        />
        <TabBarBody
          switchTabFlag={switchTabFlag}
          choiceFlag={choiceFlag}
          onChoice={this.handleChoice}
          myMusic={myMusic}
          recommendMusic={recommendMusic}
          selectedMusicIds={selectedMusicIds}
          selectedMusicTypes={selectedMusicTypes}
          onSelectMusic={this.handleSelectMusic}
          onMaskShow={this.handleMaskShow}
          currentMusic={currentMusic}
          onMessageShow={this.showMessage}
        />
        <Mask
          isActive={isMaskActive}
          onMaskShow={this.handleMaskShow}
          maskItem={maskItem}
          selectedMusicIds={selectedMusicIds}
          onDeleteMusic={this.handleDeleteMusic}
          onRenameMusic={this.handleRenameMusic}
          currentMusic={currentMusic}
          Actions={Actions}
          choiceFlag={choiceFlag}
          onMessageShow={this.showMessage}
        />
        <Message
          message={message}
        />
      </div>
    );
  }
}

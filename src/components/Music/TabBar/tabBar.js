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
      selectedMusicTypes: [], // 选中歌曲的类型，我的音乐 or 推荐音乐
      isMaskActive: false,
      maskItem: null,
      message: null
    };
  }

  getCurrentMusic = currentMusicId => {
    const { myMusic, recommendMusic } = this.props;
    if (!currentMusicId) {
      return null;
    }
    return myMusic[currentMusicId] ? myMusic.myMusicList[currentMusicId] : recommendMusic[currentMusicId];
  };

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
        choiceFlag: key
      });
      if (this.state.selectedMusicIds.length) {
        this.props.Actions.storeSelectedMusic(this.state.selectedMusicIds[0]);
      }
    } else {
      this.setState({
        message: null,
        choiceFlag: key
      });
    }
  }

  handleSelectMusic = (id, type) => {
    console.log(this.state.choiceFlag, this.state.selectedMusicIds);
    const newSelectedMusicIds = [...this.state.selectedMusicIds];
    const newSelectedMusicTypes = [...this.state.selectedMusicTypes];
    if (this.state.choiceFlag) { // 如果是单选状态
      this.setState({
        message: null,
        selectedMusicIds: [id],
        selectedMusicTypes: [type]
      });
      this.props.Actions.storeSelectedMusic([id]);
    } else if (newSelectedMusicIds.includes(id)) { // 如果是多选状态 已选中
      const idx = newSelectedMusicIds.indexOf(id);
      newSelectedMusicIds.splice(idx, 1);
      newSelectedMusicTypes.splice(idx, 1);
      this.setState({
        message: null,
        selectedMusicIds: newSelectedMusicIds,
        selectedMusicTypes: newSelectedMusicTypes
      });
      this.props.Actions.storeSelectedMusic(newSelectedMusicIds);
    } else if (newSelectedMusicIds.length < 5) { // 如果是多选状态 未选中 还装得下
      newSelectedMusicIds.push(id);
      newSelectedMusicTypes.push(type);
      this.setState({
        message: null,
        selectedMusicIds: newSelectedMusicIds,
        selectedMusicTypes: newSelectedMusicTypes
      });
      this.props.Actions.storeSelectedMusic(newSelectedMusicIds);
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
      selectedMusicIds: []
    });
    this.handleMaskShow(null);
  }

  handleMaskShow = maskItem => {
    this.setState({
      message: null,
      isMaskActive: !this.state.isMaskActive,
      maskItem
    });
  }

  handleRenameMusic = newName => {
    if (newName.length) {
      this.props.Actions.renameMusic(this.state.selectedMusicIds[0], newName);
      this.handleMaskShow(null);
    } else {
      alert('输入不能为空');
    }
  }

  showMessage = message => {
    this.setState({
      message
    });
  }

  render() {
    const {
      myMusic,
      recommendMusic,
      currentMusic,
      Actions
    } = this.props;
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
          selectedMusicTypes={this.state.selectedMusicTypes}
          onSelectMusic={this.handleSelectMusic}
          onDeleteMusic={this.handleDeleteMusic}
          onMaskShow={this.handleMaskShow}
          currentMusic={currentMusic}
          onMessageShow={this.showMessage}
        />
        <Mask
          isActive={this.state.isMaskActive}
          onMaskShow={this.handleMaskShow}
          maskItem={this.state.maskItem}
          selectedMusicIds={this.state.selectedMusicIds}
          onDeleteMusic={this.handleDeleteMusic}
          onRenameMusic={this.handleRenameMusic}
          currentMusic={currentMusic}
          Actions={Actions}
          choiceFlag={this.state.choiceFlag}
          onMessageShow={this.showMessage}
        />
        <Message
          message={this.state.message}
        />
      </div>
    );
  }
}

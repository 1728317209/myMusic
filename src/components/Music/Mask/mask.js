import React, { Component } from 'react';
import Play from './play';
import Share from './share';
import Delete from './delete';
import Cut from './cut';
import Rename from './rename';
import './mask.css';

export default class Mask extends Component {
  getMaskClassName = () => {
    if (!this.props.isActive) {
      return 'mask hideMask';
    }
    return 'mask showMask';
  }

  renderMaskBody = () => {
    switch (this.props.maskItem) {
      case 'play': {
        return (
          <Play
            onMaskShow={this.props.onMaskShow}
            music={this.props.currentMusic}
          />
        );
      }
      case 'rename': {
        return (
          <Rename
            onMaskShow={this.props.onMaskShow}
            onRenameMusic={this.props.onRenameMusic}
            currentMusic={this.props.currentMusic}
          />
        );
      }
      case 'cut': {
        const { Actions, onMaskShow, currentMusic } = this.props;
        return (
          <Cut
            music={currentMusic}
            onMaskShow={onMaskShow}
            onCutMusic={Actions.cutMusic}
            onMessageShow={this.props.onMessageShow}
          />
        );
      }
      case 'share': {
        return (
          <Share
            currentMusic={this.props.currentMusic}
          />
        );
      }
      case 'delete': {
        return (
          <Delete
            onMaskShow={this.props.onMaskShow}
            onDeleteMusic={this.props.onDeleteMusic}
            selectedMusicIds={this.props.selectedMusicIds}
            currentMusic={this.props.currentMusic}
            choiceFlag={this.props.choiceFlag}
          />
        );
      }
      default:
        return null;
    }
  }
  render() {
    return (
      <div className="Mask">
        <div className={this.getMaskClassName()} onClick={() => this.props.onMaskShow(null)} />
        {
          this.renderMaskBody()
        }
      </div>
    );
  }
}

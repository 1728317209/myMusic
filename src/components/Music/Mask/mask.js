import React, { Component } from 'react';
import Play from './play';
import Share from './share';
import Delete from './delete';
import Cut from './cut';
import Rename from './rename';
import './mask.css';

export default class Mask extends Component {
  state = {
    //
  };

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
          />
        );
      }
      case 'rename': {
        return (
          <Rename
            onMaskShow={this.props.onMaskShow}
            onRenameMusic={this.props.onRenameMusic}
          />
        );
      }
      case 'cut': {
        return (
          <Cut
            onMaskShow={this.props.onMaskShow}
            music={this.props.currentMusic}
          />
        );
      }
      case 'share': {
        return (
          <Share />
        );
      }
      case 'delete': {
        return (
          <Delete
            onMaskShow={this.props.onMaskShow}
            onDeleteMusic={this.props.onDeleteMusic}
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

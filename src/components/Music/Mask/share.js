import React from 'react';
import './mask.css';

const Share = ({ currentMusic }) => (
  <div className="Share" >
    <div className="share-textArea">送出 {currentMusic.name} ^v^</div>
  </div>
);

export default Share;

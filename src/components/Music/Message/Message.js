import React from 'react';
import './index.css';

let flag = false;
const Message = ({ message }) => {
  if (!message || message.length === 0) {
    return null;
  }
  // if (maskItem !== lastMaskItem || message !== lastMessage) {
  //   flag = !flag;
  //   lastMessage = message;
  //   lastMaskItem = maskItem;
  // }
  flag = !flag;
  return (
    <div className={`Message-${flag}`}>
      <div className="result">{message}</div>
    </div>
  );
};
export default Message;

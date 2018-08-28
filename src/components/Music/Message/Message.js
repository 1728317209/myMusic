import React from 'react';
import './index.css';

let flag = false;
const Message = ({ message }) => {
  // 消息提示组件
  if (!message || message.length === 0) {
    return null;
  }
  flag = !flag;
  return (
    <div className={`Message-${flag}`}>
      <div className="result">{message}</div>
    </div>
  );
};

export default Message;

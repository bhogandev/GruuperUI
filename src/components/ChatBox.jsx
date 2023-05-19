import React from 'react';
import Message from './Message';
import '../css/GruupChat.css'; // Import the CSS file

const ChatBox = (props) => {
  const { chatMessages } = props;

  if (!chatMessages || chatMessages.length === 0) {
    return <div className="chat-box">No messages yet.</div>; // Apply the 'chat-box' class to the root div
  }

  const renderedMessages = chatMessages.map((m) => (
    <Message
      key={Date.now() * Math.random()}
      user={m.user}
      message={m.message}
      time={m.time}
    />
  ));

  return <div className="chat-box">{renderedMessages}</div>; // Apply the 'chat-box' class to the root div
};

export default ChatBox;

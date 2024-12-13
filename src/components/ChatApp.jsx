// ChatApp.js
import React, { useState } from 'react';
import '../styles/ChatApp.css';
// import {user} from "./Details"

function ChatApp() {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [theme, setTheme] = useState('dark');

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const newMessage = {
        id: Date.now(),
        text: inputValue,
        sender: 'you',
        timestamp: new Date().toLocaleTimeString(),
      };
      setMessages([...messages, newMessage]);
      setInputValue('');
    }
  };

  const handleToggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className={`chat-app ${theme}`}>
      <div className="sidebar">
        <div className="profile">
          <img src="profile.jpg" alt="Profile" />
          <div className="profile-info">
            <h2>John Doe</h2>
            <p>Online</p>
          </div>
        </div>
        <div className="nav">
          <div className="nav-item active">Chat 1</div>
          <div className="nav-item">Chat 2</div>
          <div className="nav-item">Chat 3</div>
        </div>
      </div>

      <div className="chat-container">
        <div className="header">
          Chat App
          <button className="theme-toggle" onClick={handleToggleTheme}>
            Toggle Theme
          </button>
        </div>

        <div className="messages">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`message ${message.sender === 'You' ? 'sent' : 'received'}`}
            >
              {message.sender !== 'You' && <div className="sender">{message.sender}</div>}
              {message.text}
              <div className="timestamp">{message.timestamp}</div>
            </div>
          ))}
        </div>

        <div className="input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
}

export default ChatApp;

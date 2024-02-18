import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import InputMassge from '../InputMassge';
import MessageItem from '../MessageItem/MessageItem';
import { socket } from '../socket';

export default function MessagesList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // טעינת ההודעות מהאחסון המקומי
    const storedMessages = JSON.parse(localStorage.getItem('messages') || '[]');
    if (storedMessages.length > 0) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    };

    socket.on('newMessage', handleNewMessage);

    return () => {
      socket.off('newMessage', handleNewMessage);
    };
  }, [socket]);

  // שמירת ההודעות באחסון המקומי בכל פעם שהן משתנות
  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          <MessageItem message={msg} />
        </div>
      ))}
      <InputMassge onMessageSend={(newMessage) => setMessages((prevMessages) => [...prevMessages, newMessage])} />
    </div>
  );
}
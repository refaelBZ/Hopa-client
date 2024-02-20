import React, { useEffect, useState, useRef } from 'react';
import styles from './style.module.css';
import InputMassge from '../InputMassge';
import MessageItem from '../MessageItem/MessageItem';
import { socket } from '../socket';

export default function MessagesList() {
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null); // הוספת useRef לגלילה אוטומטית

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

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages)); // שמירת ההודעות באחסון המקומי
  }, [messages]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); // גלילה אוטומטית להודעה האחרונה
  }, [messages]); // תלות במערך ההודעות

  return (
    <div className={styles.chatContainer}>
      {messages.map((msg, index) => (
        <div key={index} className={styles.messageWrapper}>
          <MessageItem message={msg} className={styles.messageItem} />
        </div>
      ))}
      <div ref={messagesEndRef} /> {/* אלמנט לגלילה */}
      <InputMassge 
        onMessageSend={(newMessage) => setMessages((prevMessages) => [...prevMessages, newMessage])} 
        className={styles.inputMessage} 
      />
    </div>
  );
}
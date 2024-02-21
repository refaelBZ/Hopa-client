import React from "react";
import styles from "./style.module.css";

export default function MessageItem({ message }) {
  const timeFromServer = message.time;
  const date = new Date(timeFromServer);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // קריאה לשם המשתמש מ-localStorage
  const currentUser = localStorage.getItem('userInputData');

  // בדיקה אם השולח זהה למשתמש הנוכחי
  const isCurrentUser = message.sender === currentUser;

  // הגדרת סגנון ההודעה בהתאם לתוצאת הבדיקה
  const messageStyle = isCurrentUser ? styles.currentUserMessage : styles.otherUserMessage;

  return (
    <div className={`${styles.message} ${messageStyle}`}>
      <div className={styles.name}>{message.sender}</div>
      <div className={styles.content}>{message.content}</div>
      <div className={styles.time}>{formattedTime}</div>
    </div>
  );
}

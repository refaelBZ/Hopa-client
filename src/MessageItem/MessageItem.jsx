
import React from "react";
import styles from "./style.module.css";

export default function MessageItem({ message }) {
  // המרת זמן השרת לשעה ודקה
  const timeFromServer = message.time; // הנחה שהזמן נמצא במאפיין time של ההודעה
  const date = new Date(timeFromServer);
  const formattedTime = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={styles.message}>
      <div className={styles.name}>{message.sender}</div>
      <div className={styles.content}>{message.content}</div>
      <div className={styles.time}>{formattedTime}</div>
    </div>
  );
}
import styles from "./style.module.css";
import { useEffect, useState } from "react";
import React from "react";
import InputMassge from "../InputMassge";
import MessageItem from "../MessageItem/MessageItem";
import { socket } from "../socket";


export default function MessegesList() {
  const [messages, setMessages] = useState([]); // הגדרת ערך התחלתי כמערך ריק


  useEffect(() => {
    // טעינת ההודעות מהאחסון המקומי
    const storedMessages = JSON.parse(localStorage.getItem("messages") || '[]');
    if (storedMessages.length > 0) {
      setMessages(storedMessages);
    }
  }, []);
  
  // פונקציה להוספת הודעה חדשה לרשימת ההודעות
  const addMessage = (newMessage) => {
    const updatedMessages = [ ...newMessage];
    setMessages(updatedMessages)
    console.log(updatedMessages)
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
  };
 

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message) => {
      addMessage(message);
    });

    socket.on("msgHistory", (arg) => {
      addMessage(arg);
      //setMessage(arg)
      console.log(arg);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          {<MessageItem  message={msg}/>}
          </div>
      ))}

      <InputMassge onMessageSend={addMessage} />
    </div>
  );
}

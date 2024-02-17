import styles from "./style.module.css";
import { useEffect, useState } from "react";
import React from "react";
import InputMassge from "../InputMassge";
import MessageItem from "../MessageItem/MessageItem";
import { socket } from "../socket";

// const messagesDemo =[{
//     content : "hello world! it's my first message here",
//     sender : "Jacobnbbb",
//     time : "10:00",
// },
// {
//     content : "hello world! it's my first message here",
//     sender : "Jacob",
//     time : "10:00",
// },
// {
//     content : "hello world! it's my first message here",
//     sender : "Jacob",
//     time : "10:00",
// }
// ]

export default function MessegesList() {
  const [messages, setMessages] = useState([]); // הגדרת ערך התחלתי כמערך ריק

  console.log("messages", messages);

  // פונקציה להוספת הודעה חדשה לרשימת ההודעות
  const addMessage = (newMessage) => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };
 
  useEffect(() => {
    socket.on("msgHistory", (arg) => {
      console.log("msgHistory", arg);
      setMessages(arg);
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message) => {
      addMessage(message);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>{<MessageItem message={msg}/>}</div>
      ))}

      <InputMassge onMessageSend={addMessage} />
    </div>
  );
}

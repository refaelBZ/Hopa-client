import styles from "./style.module.css";
import { useEffect, useState } from "react";
import React from "react";
import InputMassge from "../InputMassge";
import MessageItem from "../MessageItem/MessageItem";

const messagesDemo = [
  {
    content: "hello world! it's my first message here",
    sender: "Jacobnbbb",
    time: "10:00",
  },
  {
    content: "hello world! it's my first message here",
    sender: "Jacob",
    time: "10:00",
  },
  {
    content: "hello world! it's my first message here",
    sender: "Jacob",
    time: "10:00",
  },
];

export default function MessegesList({ socket }) {
  const [messages, setMessages] = useState(messagesDemo);

  useEffect(() => {
    if (!socket) return;

    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, [socket]);

  return (
    <div>
      {messages.map((msg, index) => (
        <div key={index}>
          {
            <MessageItem
              content={msg.content}
              sender={msg.sender}
              time={msg.time}
            />
          }
        </div>
      ))}

      <InputMassge />
    </div>
  );
}

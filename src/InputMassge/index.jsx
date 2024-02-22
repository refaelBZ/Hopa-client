import React from "react";
import styles from "./style.module.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";

export default function InputMessage({ onMessageSend }) {
  const [input, setInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);
  };

  const handleClick = () => {
    // קריאה לשם המשתמש מ-localStorage
    const senderName = localStorage.getItem("userInputData") || "אנונימי"; // אם לא נמצא שם, השתמש ב-'אנונימי'

    const newMessage = {
      content: input,
      sender: senderName,
      time: new Date().toISOString(),
    };

    // שליחת האובייקט המלא ולא רק הטקסט
    socket.emit("clientMessage", newMessage);

    setInput(""); // איפוס תוכן הקלט לאחר שנשלח
  };

  useEffect(() => {
    socket.on("serverMessage", (arg) => {
      console.log(arg);
      // ניתן לעשות פעולות נוספות עם התגובה מהשרת אם יש צורך
    });

    return () => {
      socket.off("serverMessage");
    };
  }, []);

  return (
    <>
      <div className={styles.inputGroup}>
        <button className={styles.button} onClick={handleClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            ></path>
          </svg>
          שלח
        </button>
        <input
          type="text"
          value={input}
          onChange={handleChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleClick();
            }
          }}
          className={styles.input}
        />
      </div>
    </>
  );
}

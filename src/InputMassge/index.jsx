
import React from "react";
import styles from "./style.module.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import MessageItem from "../MessageItem/MessageItem";

export default function InputMassge({onMessageSend}) {
  const [Message,setMessage]=useState("")
  const [arg, setArg] = useState("");
  const [input, setInput] = useState("");
  // const [time, setTime] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);  
    // setTime(Date.now());
  };

  const handleClick = () => {
    const newMessage = { content: input, sender: 'me', time: new Date().toISOString() }; // יצירת אובייקט הודעה חדש
    onMessageSend(newMessage); // הוספת ההודעה לרשימת ההודעות
    socket.emit("clientMessage", input); 
    // setInput(""); // איפוס תוכן הקלט לאחר שנשלח
  };

  // const handleKeyPress = (e) => {
  //   if (e.key === "Enter") {
  //     handleClick();
  //   }
  // };      
  


  useEffect(() => {
    socket.on("serverMessage", (arg) => {
      console.log(arg);
      setArg(arg);
    });
 
    return () => {
      socket.off("serverMessage");
    };
  }, [arg]);

  return (
<>     
  <div className={styles.inputGroup}>
    <input
      type="text"
      // onKeyDown= {(e)=>handleKeyPress()}
      onChange={handleChange}
      className={styles.input}
    />
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
      Send 
    </button>
  </div>
</>

  );
}
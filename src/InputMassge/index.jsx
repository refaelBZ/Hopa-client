import React from "react";
import styles from "./style.module.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";
import MessageItem from "../MessageItem/MessageItem";

export default function InputMassge({onMessageSend}) {
  const [Message,setMessage]=useState("")
  const [arg, setArg] = useState("");
  const [input, setInput] = useState("");
  const [time, setTime] = useState();

  const handleChange = (e) => {
    e.preventDefault();
    setInput(e.target.value);  
    setTime(Date.now());
  };

  const handleClick = () => {
    // onMessageSend(input);
    socket.emit("clientMessage", input); 
  };


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
      <div className={styles.wavegroup}>
        <input
          required=""
          type="text"
          onChange={handleChange}
          className={styles.input}
        />
        <div className={styles.bar}></div>
      </div>
      <button className={styles.button} onClick={handleClick}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
          ></path>
        </svg>
        Send 
      </button>
    </>
  );
}
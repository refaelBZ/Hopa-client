import React from "react";
import styles from "./style.module.css";
import { socket } from "../socket";
import { useEffect, useState } from "react";

import MessageItem from "../MessageItem/MessageItem";
import { list } from "postcss";

export default function InputMassge() {
  const [arg, setArg] = useState("");
  const [input, setInput] = useState("");
  
  
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  const handleClick = () => {
    socket.emit("clientMessage", input);
  };

useEffect(()=>{
setListMessage
} ,[handleClick])

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
      <button onClick={handleClick}>Send</button>
      <MessageItem content ={input}/>
    </>
  );
}

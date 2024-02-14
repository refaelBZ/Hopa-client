import React from 'react'
import styles from "./style.module.css"

export default function MessageItem({ content = "hello world! it's my first message here", sender = "Jacob", time = "10:00" }) {
    return (
    <div className={styles.message}>

<div className={styles.name}>{sender}</div>
<div className={styles.content}>{content}</div>
<div className={styles.time}>{time}</div>

    </div>
  )
}

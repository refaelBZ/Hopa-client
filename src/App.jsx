// import { useEffect, useState } from 'react';
// import { socket } from './socket';
import InputMassge from "./InputMassge";

export default function App() {


  // const [arg, setArg]=useState()

  // const handleClick = () => {
  //   socket.emit("clientMessage", "hhgggg");
  // };

  // useEffect(() => {
  //   socket.on("serverMessage", (arg) => {
  //     console.log(arg);
  //     setArg(arg)

  //   });

  //   return () => {
  //     socket.off("serverMessage");
  //   };
  // }, [arg]);

  return (
    <div className="App">
      {/* <button onClick={handleClick}>Send</button>
      {arg} */}
      <InputMassge/>
    </div>
  );
}

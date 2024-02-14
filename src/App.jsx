import { useEffect, useState } from 'react';
import { socket } from './socket';
import InputMassge from "./InputMassge";
import MessegesList from "./MessegesList";
export default function App() {


  const [arg, setArg]=useState()

  const handleClick = () => {
    socket.emit("clientMessage", "hhgggg");
  };

  useEffect(() => {

    socket.on("connection", console.log("connection has been established"))

    socket.on("serverMessage", (arg) => {
      console.log(arg);
      setArg(arg)


    

    });


    


    return () => {
      socket.off("serverMessage");
    };
  }, []);


  return (
    <div className="App">
      {/* <button onClick={handleClick}>Send</button>
      {arg} */}
      <MessegesList/>

      
    </div>
  );
}

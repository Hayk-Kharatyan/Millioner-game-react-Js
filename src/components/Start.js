import React, { useEffect, useRef } from "react";
import startMusic from "../sounds/commerical.mp3"
import useSound from "use-sound";
const Start = ({ setName, setTimeOut }) => {
  const [letsStart] = useSound(startMusic)

  useEffect(() => {
    letsStart()
  }, [letsStart])


  const inputRef = useRef();

  const handleClick = () => {
    setTimeOut(false);
    inputRef.current.value && setName(inputRef.current.value);
  };


  return (

    <div
      style={{
        margin: "auto",
        padding: "15px",
        maxWidth: "400px",
        alignContent: "center",
        marginTop: "300px",
      }}
    >

      <img className="img-flip" alt="logo" src="./images/logom.png"></img>

      <input
        type="text"
        placeholder="Enter Name"
        ref={inputRef}
        className="form-control"
      />
      <button style={{ width: "100%" }} className="mt-2" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
};

export default Start;

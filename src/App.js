import { useState, useEffect } from "react";
import "./App.css";
import Quiz from "./components/Quiz";
import { data, prizeMoney } from "./data";
import Timer from "./components/Timer";
import Start from "./components/Start";
import win from "./sounds/win.mp3"
import useSound from "use-sound";

function App() {
  const [name, setName] = useState(null);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [timeOut, setTimeOut] = useState(false);
  const [earned, setEarned] = useState("$ 0");
  const [CallFriend, setCallFriend] = useState(true)
  const [HallHelp, setHallHelp] = useState(true)
  const [Fifty, setFifty] = useState(true)
  const [SwitchAnswer, setSwitchAnswer] = useState(true)
  const [GetFriend, setGetFriend] = useState({})
  const [GetText, setGetText] = useState({})
  const [openDiv, setOpenDiv] = useState(false)
  const [GetAnswer, setGetAnswer] = useState("")
  const [openHallAsistance, setOpenHallAsistance] = useState(false)
  const [GetAnswerHall, setGetAnswerHall] = useState("")
  const [winsound] = useSound(win)
  let [HallA, setHallA] = useState(0)
  let [HallB, setHallB] = useState(0)
  let [HallC, setHallC] = useState(0)
  let [HallD, setHallD] = useState(0)
  useEffect(() => {
    questionNumber > 1 &&
      setEarned(
        prizeMoney.find((item) => item.id === questionNumber - 1).amount
      );
  }, [questionNumber]);

  useEffect(()=>{
    earned === "$ 1000000" &&
    winsound()
  },[earned])



  let MaxNum = Math.max(HallA, HallB, HallC, HallD)
  let Choices = ["A", "B", "C", "D"]
  let index = Choices.indexOf(GetAnswerHall)
  Choices.splice(index,1)
  return (

    <div className="App">

      {!name ?
        <Start setName={setName} setTimeOut={setTimeOut} />
        :
        <div style={{ display: "flex" }}>
          <div style={{ width: "75%" }}>
            {
              openDiv === true &&
              <div className="FriendHelp">
                <div className="txtdiv">
                  <div className="txttitle">Friend Help</div>
                  <div className="flextxt">
                    <span className="txt">{GetFriend.friendOne.name}:{GetText.Textone} <span className="rightanswer">{GetAnswer}</span></span>
                  </div>
                  <div className="flexbtn">
                    <button className="Friendbtn" onClick={() => setOpenDiv(false)}>Continue</button>
                  </div>
                </div>
              </div>
            }
            {
              openHallAsistance &&
              <div className="HallAsistance">
                <div className="backimage">
                  <div className="titleHall">Hall assistance</div>
                  <div className="progessabars">
                    <div style={{ height: `${HallA}%` }} className="Progress-A">{HallA === MaxNum ? GetAnswerHall : Choices.includes(Choices[0]) ? Choices[0] : "A"}</div>
                    <div style={{ height: `${HallB}%` }} className="Progress-B">{HallB === MaxNum ? GetAnswerHall : Choices.includes(Choices[1]) ? Choices[1] : "B"}</div>
                    <div style={{ height: `${HallC}%` }} className="Progress-C">{HallC === MaxNum ? GetAnswerHall : Choices.includes(Choices[2]) ? Choices[2] : "C"}</div>
                    <div style={{ height: `${HallD}%` }} className="Progress-D">{HallD === MaxNum ? GetAnswerHall : Choices.includes(Choices[3]) ? Choices[3] : "D"}</div>
                  </div>
                  <div className="percents">
                    <div>{HallA} %</div>
                    <div>{HallB} %</div>
                    <div>{HallC} %</div>
                    <div>{HallD} %</div>
                  </div>

                  <div className="btnHall">
                    <button className="btt" onClick={() => setOpenHallAsistance(false)}>Continue</button>
                  </div>

                </div>

              </div>
            }
            {
              earned === "$ 1000000" ?
                <div className="win-game">
                  <h3 className="win-txt">Congratulations you win <span className="money-win">{earned}</span></h3>
                  <button className="restart" onClick={() => {
                    setQuestionNumber(1);
                    setEarned("$ 0");
                    setFifty(true)
                    setHallHelp(true)
                    setSwitchAnswer(true)
                    setCallFriend(true)
                  }}>Play Again</button>
                </div>
                :
                <div className="main">
                  {timeOut ? (
                    <h1 className="earned">You Earned Total: {earned}</h1>
                  ) : (
                    <>
                      <div style={{ height: "50%", position: "relative" }}>
                        <div className="timer">
                          <Timer
                            setTimeOut={setTimeOut}
                            questionNumber={questionNumber}
                          />
                        </div>
                      </div>

                      <div style={{ height: "50%" }}>
                        <Quiz
                          data={data}
                          questionNumber={questionNumber}
                          setQuestionNumber={setQuestionNumber}
                          setTimeOut={setTimeOut}
                          CallFriend={CallFriend}
                          setCallFriend={setCallFriend}
                          HallHelp={HallHelp}
                          setHallHelp={setHallHelp}
                          setOpenDiv={setOpenDiv}
                          setGetAnswer={setGetAnswer}
                          setOpenHallAsistance={setOpenHallAsistance}
                          setHallA={setHallA}
                          setHallB={setHallB}
                          setHallC={setHallC}
                          setHallD={setHallD}
                          setGetFriend={setGetFriend}
                          setGetText={setGetText}
                          setGetAnswerHall={setGetAnswerHall}
                          Fifty={Fifty}
                          setFifty={setFifty}
                          SwitchAnswer={SwitchAnswer}
                          setSwitchAnswer={setSwitchAnswer}
                        />
                      </div>
                    </>
                  )}
                </div>
            }
          </div>
          <div className="money">
            <ul className="money-list">

              <span className="mb-2">
                <button
                  style={{ float: "right" }}
                  className="mx-2"
                  color="light"
                  onClick={() => setTimeOut(true)}
                >
                  Quit
                </button>
                <button
                  style={{ float: "right" }}
                  className="exit"
                  onClick={() => {
                    setName(null);
                    setQuestionNumber(1);
                    setEarned("$ 0");
                    setFifty(true)
                    setHallHelp(true)
                    setSwitchAnswer(true)
                    setCallFriend(true)
                  }}
                >
                  Exit
                </button>
              </span>
              <span className="player-name">Name: {name}</span>
              <span className="player-money">Total Earned: {earned}</span>

              <hr />
              {prizeMoney.map((item, i) => (

                <li
                  className={
                    questionNumber === item.id ? "item active" : "item"
                  }
                  key={i}
                >
                  <h5 className="amount">{item.amount}</h5>
                </li>

              ))}
            </ul>
          </div>
        </div>
      }

    </div>
  );
}

export default App;

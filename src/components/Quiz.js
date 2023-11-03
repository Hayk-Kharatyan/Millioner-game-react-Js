import React, { useState, useEffect} from "react";
import useSound from "use-sound"
import play from "../sounds/play.mp3";
import correct from "../sounds/correct.mp3";
import wrong from "../sounds/wrong.mp3";
import clickedanswer from "../sounds/clickedanswer.mp3"

const Quiz = ({ data, questionNumber, setQuestionNumber, setTimeOut, CallFriend, setCallFriend, HallHelp, setHallHelp, SwitchAnswer, setSwitchAnswer, Fifty, setFifty, setOpenDiv, setGetAnswer, setOpenHallAsistance, setHallA, setHallB, setHallC, setHallD, setGetFriend, setGetText, setGetAnswerHall }) => {
  const [question, setQuestion] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [className, setClassName] = useState("answer");
  const [letsPlay] = useSound(play);
  const [correctAnswer] = useSound(correct);
  const [wrongAnswer] = useSound(wrong);
  const [clicked] = useSound(clickedanswer);
  let setQuestionOne = [
    {
      question: "Which two words traditionally appear onscreen at the termination of a feature film?",
      answers: [
        {
          choice: "A",
          text: "The End",
          correct: true,
        },
        {
          choice: "B",
          text: "The Conclusion",
          correct: false,
        },
        {
          choice: "C",
          text: "The Finish",
          correct: false,
        },
        {
          choice: "D",
          text: "The Pizza Rolls Are Done",
          correct: false,
        },
      ],
    },
    {
      question: "In the United States, what is traditionally the proper way to address a judge?",
      answers: [
        {
          choice: "A",
          text: "Your holiness",
          correct: false,
        },
        {
          choice: "B",
          text: "Your Honor",
          correct: true,
        },
        {
          choice: "C",
          text: "Your eminence",
          correct: false,
        },
        {
          choice: "D",
          text: "You da man!",
          correct: false,
        },
      ],
    },
    {
      question: "A magnet would most likely attract which of the following?",
      answers: [
        {
          choice: "A",
          text: "Wood",
          correct: false,
        },
        {
          choice: "B",
          text: "Aluminium",
          correct: false,
        },
        {
          choice: "C",
          text: "Metal",
          correct: true,
        },
        {
          choice: "D",
          text: "Plastic",
          correct: false,
        },
      ],
    },
  ]
  const randomIndex = Math.floor(Math.random() * setQuestionOne.length);

  let friendArr = [
    {
      name: "Michael Jackson",
      texts: [
        "Hello my friend i think the correct answer is ",
        "I checked the answer,answer is 100% ",
        "Ha-ha! And here I thought you knew everything. Even I know the correct answer is "
      ]

    },
    {
      name: "Angelina Jolie",
      texts: [
        "Intelligence isn’t your best feature, is it? This is the easiest question! The answer is ",
        "You definitely asked the right friend! I’m sure of it. Answer is  ",
        "I asked my friend and he knows the answer,answer is "
      ]
    },
    {
      name: "Brad Pitt",
      texts: [
        "That’s easy! Can’t believe you need to ask. You’re such an idiot - the correct answer is ",
        "Wow, I always joke about you being an idiot, and now you’ve proved me right!.How could you not know that?! The answer is !  ",
        "Seriously? Did we even go to the same school? Of course the answer is  "
      ]
    },
  ]




  useEffect(() => {
    setQuestion(data[questionNumber - 1]);
  }, [data, questionNumber]);

  useEffect(() => {
    letsPlay();
  }, [letsPlay]);

  const delay = (duration, callBack) => {
    setTimeout(() => {
      callBack();
    }, duration);
  };

  const handleClick = (item) => {
    if (item.text.length !== 0) {
      clicked()
      setSelectedAnswer(item);
      setClassName("answer active");
      delay(3000, () => {
        setClassName(item.correct ? "answer correct" : "answer wrong");
      });

      delay(5000, () => {
        if (item.correct) {
          correctAnswer();
          delay(1000, () => {
            setQuestionNumber((prev) => prev + 1);
            setSelectedAnswer(null);
          });
        } else {
          wrongAnswer();
          delay(1000, () => {
            setTimeOut(true);
          });
        }
      });
    }
  };

  let [AnswerCount, setAnswerCount] = useState(1)
  return (
    <div className="quiz">

      <div className="Helps">
        <button className={Fifty === true ? "" : "usedbtn"} onClick={() => {
          question?.answers.forEach((a) => {
            if (a.correct === false && AnswerCount <= 2) {
              a.text = ""
              a.choice = ""
              setAnswerCount(AnswerCount++)
            }
          })
          setFifty(false)

        }}><img alt="help" width="50px" height="50px" src="./images/2answers.webp"></img></button>
        <button onClick={() => {
          if (CallFriend === true) {
            const randomFriend = Math.floor(Math.random() * friendArr.length);
            const friendOne = friendArr[randomFriend]
            const randomText = Math.floor(Math.random() * friendOne.texts.length);
            const Textone = friendOne.texts[randomText]

            question?.answers.map((item) => {
              if (item.correct) {
                setGetAnswer(item.choice)
              }
            })

            setGetFriend({
              friendOne: friendOne
            }

            )
            setGetText({
              Textone: Textone
            })

            setOpenDiv(true)
            setCallFriend(false)
          }
        }} className={CallFriend === true ? "" : "usedbtn"}><img alt="help" width="50px" height="50px" src="./images/phone.webp"></img></button>
        <button className={SwitchAnswer === true ? "" : "usedbtn"} onClick={() => {
          if (SwitchAnswer) {
            setQuestion(setQuestionOne[randomIndex])
            setSwitchAnswer(false)
          }

        }}><img alt="help" width="50px" height="50px" src="./images/switch.png"></img></button>
        <button className={HallHelp === true ? "" : "usedbtn"} onClick={() => {
          if (HallHelp) {
            let A = Math.floor(Math.random() * 26)
            let B = Math.floor(Math.random() * 26) + 25
            B += A
            let C = Math.floor(Math.random() * 26) + 50
            if (B > C) {
              B -= C
            }
            else {
              C -= B
            }
            let AllOne = A + B + C
            let D = 100 - AllOne
            question?.answers.map((item) => {
              if (item.correct) {
                setGetAnswerHall(item.choice)
              }
            })
            setHallA(A)
            setHallB(B)
            setHallC(C)
            setHallD(D)
            setOpenHallAsistance(true)
            setHallHelp(false)
          }
        }}><img alt="help" width="50px" height="50px" src="./images/peoplehelp.png"></img></button>
      </div>
      <div className="question">{question?.question}</div>
      <div className="answers">
        {question?.answers.map((item, i) => (

          <div
            key={i} className={selectedAnswer === item ? className : "answer"}
            onClick={() => !selectedAnswer && handleClick(item)}
          >
            <span className="choice">{item.choice}</span> {item.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quiz;

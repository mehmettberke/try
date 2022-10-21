import React from "react";
import wordList from "./wordData";
import newWords from "./newWordData";
import Confetti from "react-confetti";
import newWordData from "./newWordData";
const allWords = wordList;
const totalLength = wordList.length;
const wrongAnswers = [];
export default function Wörter() {
  const [words, setWords] = React.useState(wordList);
  let [selectedWord, setSelectedWord] = React.useState(
    words[Math.ceil(Math.random() * words.length - 1)]
  );
  let [correctState, setCorrectState] = React.useState();
  let newArtikelState;
  let newDeutschState;
  let newPluralState;
  function checkCorrect() {
    newArtikelState = document.querySelector(".artikel")
      ? document.querySelector(".artikel").value === selectedWord.artikel
        ? "correct"
        : "wrong"
      : "correct";
    newDeutschState =
      document.querySelector(".bedeutung").value === selectedWord.deutsch
        ? "correct"
        : "wrong";
    newPluralState = document.querySelector(".plural")
      ? document.querySelector(".plural").value === selectedWord.plural
        ? "correct"
        : "wrong"
      : "correct";

    if (
      newArtikelState === "correct" &&
      newDeutschState === "correct" &&
      newPluralState === "correct"
    ) {
      setCorrectState("correct");
    } else {
      setCorrectState("wrong");
      if (
        !wrongAnswers.some((el) => {
          return el.deutsch === selectedWord.deutsch;
        })
      ) {
        wrongAnswers.push(selectedWord);
        localStorage.setItem("wrongAnswers", JSON.stringify(wrongAnswers));
      }
    }

    setSelectedWord((oldAnswers) => {
      return {
        ...oldAnswers,
        artikelState: newArtikelState,
        deutschState: newDeutschState,
        pluralState: newPluralState,
        allTrue:
          newArtikelState === "correct" &&
          newDeutschState === "correct" &&
          newPluralState === "correct",
      };
    });
  }

  function changeWord() {
    if (words.length > 0) {
      setWords((oldWords) => {
        const copyArr = oldWords;
        copyArr.forEach((el) => {
          if (el.deutsch === selectedWord.deutsch) {
            const index = copyArr.indexOf(el);
            copyArr.splice(index, 1);
          }
        });
        return copyArr;
      });
      setSelectedWord((oldWord) => {
        if (document.querySelector(".artikel"))
          document.querySelector(".artikel").value = "";
        document.querySelector(".bedeutung").value = "";
        if (document.querySelector(".plural"))
          document.querySelector(".plural").value = "";
        return words[Math.ceil(Math.random() * words.length - 1)];
      });
    } else setWords(wrongAnswers);
  }

  function makeCorrect() {
    console.log("clicked");
    if (document.querySelector(".artikel"))
      document.querySelector(".artikel").value = selectedWord.artikel;
    document.querySelector(".bedeutung").value = selectedWord.deutsch;
    if (document.querySelector(".plural"))
      document.querySelector(".plural").value = selectedWord.plural;
  }
  return (
    <div className="wörter-container">
      {words.length > 0 ? (
        <div>
          <h2 className="tr-bedeutung">{selectedWord.turkish}</h2>
          <div className="form-button-container">
            <form className="wörter-form">
              {selectedWord.artikel !== "" && (
                <input
                  className={
                    selectedWord.artikelState === "correct"
                      ? "artikel correct"
                      : selectedWord.artikelState === "wrong"
                      ? "artikel false"
                      : "artikel"
                  }
                  placeholder="Artikel"
                ></input>
              )}
              <input
                className={
                  selectedWord.deutschState === "correct"
                    ? "bedeutung correct"
                    : selectedWord.deutschState === "wrong"
                    ? "bedeutung false"
                    : "bedeutung"
                }
                placeholder="Bedeutung"
              ></input>
              {selectedWord.plural !== "" && (
                <input
                  className={
                    selectedWord.pluralState === "correct"
                      ? "plural correct"
                      : selectedWord.pluralState === "wrong"
                      ? "plural false"
                      : "plural"
                  }
                  placeholder="Plural"
                ></input>
              )}
            </form>
            <button
              onClick={makeCorrect}
              className={
                correctState === "wrong" ? "btn-correct" : "btn-correct hidden"
              }
            >
              ?
            </button>
          </div>
          <div className="btn-container">
            <button
              onClick={selectedWord.allTrue ? changeWord : checkCorrect}
              className="überprufen"
            >
              {selectedWord.allTrue ? "Next word" : "Submit"}
            </button>
          </div>
          <p className="progress">
            {totalLength - wordList.length + 1}/{totalLength}
          </p>
        </div>
      ) : (
        <div>
          <Confetti />
          <h2>Congratulations! You have completed the game!</h2>
          <div className="center">
            <button className="überprufen center">Play again</button>
          </div>
        </div>
      )}
    </div>
  );
}

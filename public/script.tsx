import React, { useState } from "https://cdn.skypack.dev/react@17.0.2?dts";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.2?dts";
import useStateEffect from "https://cdn.skypack.dev/use-state-effect";

function App() {
  const [sendText, setSendText] = useState<string>("");
  const [prevWord, setPrevWord] = useState<string>("");
  const [firstWordData, setFirstWordData] = useState<string>("");

  useStateEffect(() => {
    const dataReq = async () => {
      const response = await fetch("http://localhost:8000/shiritori");
      const previousWord = await response.json();
      setPrevWord(previousWord);
      console.log(prevWord);
    };
    dataReq();
  }, []);
  const firstReqData = async () => {
    console.log("in firstReqData");
    const data = await fetch("http://localhost:8000/firstData");
    const firstWord = await data.json();

    setFirstWordData(JSON.stringify(firstWord));
  };
  const reqData = async () => {
    const response = await fetch("/shiritori", {
      method: "POST",

      headers: { "Content-Type": "application/json" },

      body: JSON.stringify(sendText),
    });
    if (response.status / 100 !== 2) {
      alert(await response.text());
      return;
    }

    const previousWord = await response.text();
    setPrevWord(previousWord);
  };
  return (
    <div>
      <button
        onClick={() => {
          firstReqData();
        }}
      >
        最初の文字決めるボタン的な
      </button>
      <p>最初の単語:{firstWordData}</p>
      <p>前の単語:{prevWord}</p>
      <input
        value={sendText}
        onChange={(event) => setSendText(event.target.value)}
      ></input>
      <button
        onClick={() => {
          reqData();
        }}
      >
        送信
      </button>
    </div>
  );
}

function main() {
  ReactDOM.render(<App />, document.querySelector("#main"));
}

addEventListener("DOMContentLoaded", () => {
  main();
});

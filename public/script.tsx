import React, { useState } from "https://cdn.skypack.dev/react@17.0.2?dts";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.2?dts";
import useStateEffect from "https://cdn.skypack.dev/use-state-effect";

function App() {
  const [sendText, setSendText] = useState<string>("");
  const [prevWord, setPrevWord] = useState<string>("");
  const [firstWordData, setFirstWordData] = useState<string>("");
  useStateEffect(() => {
    const dataReq = async () => {
      const response = await fetch("/shiritori");
      const previousWord = await response.text();
      setPrevWord("前の単語:" + previousWord);
      console.log(prevWord);
    };
    dataReq();
  }, []);
  const firstReqData = async () => {
    const data = await fetch("/firstData");
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
    setPrevWord("前の単語:" + previousWord);
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
      <p>{prevWord}</p>
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

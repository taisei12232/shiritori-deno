import React, { useState } from "https://cdn.skypack.dev/react@17.0.2?dts";
import ReactDOM from "https://cdn.skypack.dev/react-dom@17.0.2?dts";
import useStateEffect from "https://cdn.skypack.dev/use-state-effect";
function App() {
  useStateEffect(() => {
    const dataReq = async () => {
      const response = await fetch("/shiritori");
      const previousWord = await response.text();
      setPrevWord("前の単語:" + previousWord);
    };
    dataReq();
  }, []);
  const [sendText, setSendText] = useState<string>("");
  const [prevWord, setPrevWord] = useState<string>("");
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
      <h1>しりとり</h1>
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

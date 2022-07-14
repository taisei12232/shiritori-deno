import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";
import { pokemon } from "./pokemon.tsx";
let previousWord = "しりとり";
let yahharo = "やっはろ";

console.log("Listening on http://localhost:8000");
const keepWord = {
  name: String,
  isUsers: Boolean,
};
function searchWord(word) {
  const tailChar = word[word.length - 1];
  const searchedWord = pokemon.filter((item) => item.name[0] === tailChar);
  if (searchedWord === null) {
    return false;
  } else {
    return searchedWord[Math.random * searchedWord.length];
  }
}
serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(req);
  if (req.method === "OPTIONS") {
    return new Response("", {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:1234",
        "Access-Control-Allow-Method": "GET,PUT,POST,DELETE",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  }
  if (req.method === "GET" && pathname === "/shiritori") {
    console.log("in shiritori");
    return new Response(JSON.stringify(previousWord), {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:1234",
      },
    });
  }
  if (req.method === "GET" && pathname === "/firstData") {
    console.log("in firstData");
    return new Response(JSON.stringify(pokemon[0].name), {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:1234",
      },
    });
  }

  if (req.method === "POST" && pathname === "/word") {
    // const requestJson = await req.json();

    // const nextWord = requestJson.nextWord;

    // if (
    //   nextWord.length > 0 &&
    //   previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)
    // ) {
    //   return new Response("前の単語に続いていません。", { status: 400 });
    // }

    // previousWord = nextWord;
    console.log("hello くぼたろう");
    return new Response(JSON.stringify(yahharo), {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:1234",
      },
    });
  }
  console.log("out serverDir");
  return serveDir(req, {
    fsRoot: "dist",

    urlRoot: "",

    showDirListing: true,

    enableCors: true,
  });
});

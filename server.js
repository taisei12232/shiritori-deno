import { serve } from "https://deno.land/std@0.138.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.138.0/http/file_server.ts";
import { pokemon } from "./pokemon.tsx";
let previousWord = "しりとり";

console.log("Listening on http://localhost:8000");

serve(async (req) => {
  const pathname = new URL(req.url).pathname;
  console.log(req);
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

  if (req.method === "POST" && pathname === "/shiritori") {
    const requestJson = await req.json();

    const nextWord = requestJson.nextWord;

    if (
      nextWord.length > 0 &&
      previousWord.charAt(previousWord.length - 1) !== nextWord.charAt(0)
    ) {
      return new Response("前の単語に続いていません。", { status: 400 });
    }

    previousWord = nextWord;

    return new Response(previousWord);
  }
  console.log("out serverDir");
  return serveDir(req, {
    fsRoot: "dist",

    urlRoot: "",

    showDirListing: true,

    enableCors: true,
  });
});

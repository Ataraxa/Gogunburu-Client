import "../CSS/searchResult.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { WordDisplay } from "./WordDisplay";

var cors_api_url = "https://corsproxycustom.herokuapp.com/";
// var cors_api_url = "http://localhost:8080/";

async function doCORSRequest(options, printResult) {
  console.log("Fetching Data...");
  var x = new XMLHttpRequest();
  await x.open(options.method, cors_api_url + options.url);
  x.onload = x.onerror = function () {
    printResult(
      options.method +
        " " +
        options.url +
        "\n" +
        x.status +
        " " +
        x.statusText +
        "\n\n" +
        (x.responseText || "")
    );
  };
  if (/^POST/i.test(options.method)) {
    x.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  }
  x.send(options.data);
}

export function SearchResult() {
  let word = useParams();
  const [data, setData] = useState();

  useEffect(() => {
    try {
      console.log(
        `Request at: ${cors_api_url}https://jisho.org/api/v1/search/words?keyword=${word.keyword} `
      );
      doCORSRequest(
        {
          method: "GET",
          url: "https://jisho.org/api/v1/search/words?keyword=" + word.keyword,
          data: null,
        },
        function printResult(result) {
          const resultNoHeader = result.slice(result.search("200 OK") + 8); // To remove the CORS header
          setData(JSON.parse(resultNoHeader));
        }
      );
    } catch (err) {
      console.log(err);
    }
    console.log("Data was fetched!!");
    console.log(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div class="results title">
      <h1>Search Results:</h1>
      {data?.data.map((entry, key) => {
        return <WordDisplay key={key} entry={entry} />;
      })}
    </div>
  );
}

import React, { useState } from "react";
import { supabase } from "../utils/supabase_api";
import { cryptohash } from "../utils/hash_method";

export function DummyComp() {
  return (
    <div>
      <h1>HELLO</h1>
    </div>
  );
}

export function WordDisplay(props) {
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState("");

  const word = props.entry;
  if (word === undefined) {
    console.log("skip");
  }

  const nonBreakingSpace = String.fromCharCode(160);

  // Extract data from word object
  const mainReading = word?.japanese[0] ? word?.japanese[0] : "";
  // const altReading = word.japanese.slice(1) ? word.japanese.slice(1) : "";
  const engTradArray = word.senses ? word.senses : [];
  const engTradRender = engTradArray.map((trad) => (
    <li key={trad.english_definitions}>
      <span class="partOfSpeech">{trad.parts_of_speech}</span>{" "}
      <span class="tradList">
        {trad.english_definitions.join(
          `;${nonBreakingSpace}${nonBreakingSpace}`
        )}
      </span>
    </li>
  ));

  const betaDBSave = async function (mainReading, engTradArray) {
    console.log(engTradArray);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const user_id = user.id;
    const jap_text = `${mainReading.reading} (${mainReading.word})`;
    const eng_text = engTradArray[0].english_definitions.join(", ");
    const jisho_id = cryptohash(`${jap_text}${eng_text}`);
    const today = new Date();
    console.log(user_id, jisho_id, jap_text, eng_text, today);

    const { err } = await supabase.from("saved_words").insert({
      jisho_id: jisho_id,
      user_id: user_id,
      jap_text: jap_text,
      eng_text: eng_text,
      date_saved: today,
    });
    err === null
      ? console.log("Successfully saved to database")
      : console.log(err);
  };

  return (
    <div class="results">
      {mainReading.word ? (
        <ruby class="mainReading">
          {mainReading.word}
          <rt>{mainReading.reading}</rt>
          {`${nonBreakingSpace}—${nonBreakingSpace}`}
        </ruby>
      ) : (
        <div class="mainReading">{mainReading.reading}</div>
      )}
      <ol class="senses">{engTradRender}</ol>
      <div style={{ display: "flex" }}>
        <button
          onClick={() => {
            console.log(mainReading);
            betaDBSave(mainReading, engTradArray);
          }}
        >
          {`Save to database`}
        </button>
        <div>{error}</div>
      </div>
    </div>
  );
}

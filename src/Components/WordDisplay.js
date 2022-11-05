import React, { useContext, useEffect, useState } from "react";
import { supabase } from "../utils/supabase_api";
import { cryptohash } from "../utils/hash_method";
import { KanjiDisplay } from "../Context/KanjiContext";

import Button from "react-bootstrap/Button";

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
  const [saveState, setSaveState] = useState(false);
  const [engText, setEngText] = useState();
  const [jishoId, setJishoId] = useState();

  const { kanji, setKanji } = useContext(KanjiDisplay);

  const word = props.entry;
  if (word === undefined) {
    console.log("skip");
  }

  const nonBreakingSpace = String.fromCharCode(160);

  // Extract data from word object
  const mainReading = word?.japanese[0] ? word?.japanese[0] : "";
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

  // Initial effect to set if saved or not
  useEffect(() => {
    var engToSend = [];
    engTradArray.map((entry) => {
      engToSend.push(entry.english_definitions.join("; "));
    });
    engToSend = engToSend.join("\n");

    const jap_text = `${mainReading.reading} (${mainReading.word})`;
    setJishoId(cryptohash(`${jap_text}${engToSend}`));
    updateSaveState();
  }, [jishoId]);

  const betaDBSave = async function (mainReading, engTradArray) {
    // Converting the traduction objects into a single string
    var engToSend = [];
    engTradArray.map((entry) => {
      engToSend.push(entry.english_definitions.join("; "));
    });
    engToSend = engToSend.join("\n");

    const {
      data: { user },
    } = await supabase.auth.getUser();
    const user_id = user.id;
    const jap_text = `${mainReading.reading} (${mainReading.word})`;
    const eng_text = engToSend;
    const today = new Date();
    console.log(user_id, jishoId, jap_text, eng_text, today);
    const { err } = await supabase.from("saved_words").insert({
      jisho_id: jishoId,
      user_id: user_id,
      jap_text: jap_text,
      eng_text: eng_text,
      date_saved: today,
    });
    updateSaveState();
    err === null
      ? console.log("Successfully saved to database") ||
        setSaveState("Saved in database")
      : console.log(err);
  };

  const DBDelete = async () => {
    console.log("cheh");
    const { error } = await supabase
      .from("saved_words")
      .delete()
      .eq("jisho_id", jishoId);
    updateSaveState();
  };

  const updateSaveState = async () => {
    const res = await supabase
      .from("saved_words")
      .select()
      .eq("jisho_id", `${jishoId}`);
    const count = res.data.length;
    count === 0
      ? setSaveState("Save to database")
      : setSaveState("Already saved in database");
  };

  return (
    <>
      <style type="text/css">
        {`
    .btn-flat {
      background-color: white;
      color: black;
      text-align: left;
    }
    `}
      </style>
      <div onClick={() => setKanji(mainReading.word)}>
        <div className="d-grid gap-2" class="results">
          {mainReading.word ? (
            <ruby class="mainReading">
              {mainReading.word}
              <rt>{mainReading.reading}</rt>
              {`${nonBreakingSpace}${nonBreakingSpace}:${nonBreakingSpace}`}
            </ruby>
          ) : (
            <div class="mainReading">{mainReading.reading}</div>
          )}
          <ol class="senses">{engTradRender}</ol>
          <div style={{ display: "flex" }}>
            <Button
              onClick={(event) => {
                event.stopPropagation();
                console.log(mainReading);
                saveState === "Save to database"
                  ? betaDBSave(mainReading, engTradArray)
                  : DBDelete();
              }}
            >
              {saveState}
            </Button>
            <div>{error}</div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useEffect, useState } from "react";
import "../CSS/home.css";
import "../CSS/parallax_background.css";
import { supabase } from "../utils/supabase_api";

// const dataBaseConv = async function (setData, user) {
//   const results = await axios.post("/getWords", {
//     user: user,
//   });
//   console.log(results);
//   const ret_str = `${results.data[0].jap_word} | ${results.data[0].eng_senses}`;
//   setData(ret_str);
// };

// export function Converter() {
//   console.log("Converter started");
//   const { auth } = useAuth();
//   const [data, setData] = useState("");
//   // const [animation, setAnimation] = useState("static");

//   // React.useLayoutEffect(() => {
//   //   Background(ref);
//   // }, []);

//   return (
//     <div>
//       <button onClick={() => dataBaseConv(setData, auth.user)}>Convert!</button>
//       <div></div>
//       <div>{data}</div>
//     </div>
//   );
// }

// export function Converter({ Component, pageProps }) {
//   const [data, setData] = useState();
//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     setSession(supabase.auth.session());
//     supabase.auth.onAuthStateChange((_event, session) => {
//       setSession(session);
//     });
//   }, []);

//   useEffect(() => {
//     fetchSupaData();
//   }, []);
//   const fetchSupaData = async () => {
//     const { data, error } = await supabase.from("saved_words").select("*");
//     setData(data);
//     console.log(data);
//   };
//   return <h1 sessions={session}>Hello world!</h1>;
// }

export function Converter() {
  const [vocab, setVocab] = useState();

  useEffect(() => {
    const fetchStuff = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { data, error } = await supabase
        .from("saved_words")
        .select("jap_text, eng_text")
        .eq("user_id", user?.id);
      console.log(data);
      var returnedData = Array();
      data.forEach((entry) => {
        returnedData.push(`${entry.jap_text}|${entry.eng_text}`);
      });
      returnedData = returnedData.join("/");
      console.log(returnedData);
      setVocab(returnedData);
    };

    fetchStuff();
  }, []);
  return (
    <>
      <div>Hello WORRRRLD!</div>
      <div>{vocab}</div>
    </>
  );
}

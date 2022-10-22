// import { useEffect, useState } from "react";
// import Axios from "axios";
// import useAuth from "../hooks/useAuth";
// import axios from "../api/axios";

// export function Training() {
//   const { auth } = useAuth();
//   const user = auth.user;

//   const [data, setData] = useState([]);
//   const [known, setKnown] = useState();
//   const [notKnown, setNotKnown] = useState();

//   const [index, setIndex] = useState();
//   const [indexArray, setIndexArray] = useState([]);

//   const [word, setWord] = useState("Please wait");
//   const [hints, setHints] = useState("Not yet...");

//   const handleChange = (know) => {
//     if (!know) {
//       setNotKnown((old) => [...old, word]);
//     } else if (know) {
//       setKnown((old) => [...old, word]);
//     }
//   };

//   const toggleHint = () => {};

//   const getUserData = async () => {
//     const results = await axios.post("/getWords", {
//       user: user,
//     });
//     console.log(results);
//     setData(results.data);

//     setIndexArray(
//       Array(data.length)
//         .fill()
//         .map((x, i) => i)
//     );
//     setIndex(indexArray[Math.floor(Math.random() * indexArray.length)]);
//     setWord(data[index].eng_senses);
//     setHints(data[index].jap_trad);

//     console.log(results.data[0].jap_trad);
//   };

//   useEffect(() => {
//     getUserData();
//   }, []);

//   return (
//     <>
//       <div>
//         <button onClick={getUserData}>Reload Set</button>
//       </div>
//       <div>
//         <button onClick={toggleHint}>Display trad</button>
//         <label>{hints}</label>
//       </div>
//       <div>
//         <button onClick={() => handleChange(false)}>No</button>
//         <button onClick={() => handleChange(true)}>Yes</button>
//         <label>{word}</label>
//       </div>
//     </>
//   );
// }

// export function ATraining() {
//   return <>Hi</>;
// }

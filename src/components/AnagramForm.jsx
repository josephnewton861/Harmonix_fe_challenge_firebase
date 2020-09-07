import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const AnagramForm = () => {
  const [anagramInput1, setAnagramInput1] = useState([]);
  const [anagramInput2, setAnagramInput2] = useState([]);
  const [anagramList, setAnagramList] = useState([]);
  const [sortedField, setSortedField] = useState("asc");

  const isAnagram = (str1, str2) => {
    if (typeof str1 !== "string" || typeof str2 !== "string")
      return "Input requires an input of a string";

    if (str1.length !== str2.length)
      return "input of both strings must have the same length";

    const findAnagram = str2.split("").every(function (character) {
      return str1.includes(character);
    });
    return findAnagram;
  };

  const sorted =
    anagramList &&
    anagramList.sort((a, b) => {
      const isReversedAnagram = sortedField === "asc" ? 1 : -1;
      //   console.log(isReversed); newTimeStamp
      return isReversedAnagram * a.newTimeStamp.localeCompare(b.newTimeStamp);
    });

  const onSort = (sortedField) => {
    setSortedField(sortedField);
  };

  const handlesAnagramChange1 = (event) => {
    setAnagramInput1(event.target.value);
  };

  const handlesAnagramChange2 = (event) => {
    setAnagramInput2(event.target.value);
  };

  function handlesNewLog(event) {
    let oldTimeStamp = new Date();

    let year = oldTimeStamp.getFullYear();
    let month = oldTimeStamp.getMonth();
    let day = oldTimeStamp.getDate();
    let minutes = oldTimeStamp.getMinutes();

    let newTimeStamp = `${day}/${month}/${year} ${minutes}`;

    event.preventDefault();
    firebase
      .firestore()
      .collection("item")
      .add({
        anagramInput1,
        anagramInput2,
        newTimeStamp,
        trueOrFalseAnagram: isAnagram(anagramInput1, anagramInput2),
      });
  }

  const [todos, setTodos] = useState([]);
  function useLogs() {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("item")
        // .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          const newLogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setAnagramList(newLogs);
        });
      return () => unsubscribe();
    }, []);
    return todos;
  }
  const newTodos = useLogs();

  return (
    <div>
      <input type="text" onChange={handlesAnagramChange1} />
      <input type="text" onChange={handlesAnagramChange2} />
      <button onClick={handlesNewLog}>Log anagram</button>
      <button onClick={() => onSort("desc")}>Newest logs</button>
      <button onClick={() => onSort("asc")}>oldest logs</button>
      {isAnagram(anagramInput1, anagramInput2) === false ? (
        <p>False</p>
      ) : (
        <p>True</p>
      )}
      {anagramList &&
        sorted.map((data) => {
          return (
            <ul key={data.id}>
              <li>
                {data.anagramInput1} {data.anagramInput2}
                {data.trueOrFalseAnagram}
              </li>
              <li> {data.newTimeStamp}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default AnagramForm;

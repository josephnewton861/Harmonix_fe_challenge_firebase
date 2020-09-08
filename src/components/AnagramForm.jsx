import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Button } from "react-bootstrap";

const AnagramForm = () => {
  const [anagramInput1, setAnagramInput1] = useState([]);
  const [anagramInput2, setAnagramInput2] = useState([]);
  const [anagramList, setAnagramList] = useState([]);
  const [sortedField, setSortedField] = useState("asc");
  const [showAnagramList, setAnagramShowList] = useState(false);

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
    let hour = oldTimeStamp.getHours();
    let minutes = oldTimeStamp.getMinutes();

    let newTimeStamp = `${day}/${month}/${year} ${hour}:${minutes}`;

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

  const [anagrams, setTodos] = useState([]);
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
    return anagrams;
  }
  useLogs();

  return (
    <div>
      <p className="h4">
        Enter two words into the input boxes to see if the words are anagrams of
        one another{" "}
        <em>(a word that can be spelled left to right or right to left)</em>
      </p>
      <input
        className="anagramInput"
        type="text"
        onChange={handlesAnagramChange1}
      />
      <input
        className="anagramInput"
        type="text"
        onChange={handlesAnagramChange2}
      />
      <Button onClick={handlesNewLog}>Log anagram</Button>
      {isAnagram(anagramInput1, anagramInput2) === false ? (
        <p className="resultFalse">Output = False</p>
      ) : (
        <p className="resultTrue">Output = True</p>
      )}
      <Button
        variant="secondary"
        onClick={() => setAnagramShowList(!showAnagramList)}
      >
        Show anagram list
      </Button>
      <br></br>
      <Button className="sort" variant="info" onClick={() => onSort("desc")}>
        Newest logs
      </Button>
      <Button className="sort" variant="info" onClick={() => onSort("asc")}>
        oldest logs
      </Button>

      {showAnagramList &&
        anagramList &&
        sorted.map((data) => {
          return (
            <ul className="unList" key={data.id}>
              <li>
                The word <strong>{data.anagramInput1}</strong> compared to{" "}
                <strong>{data.anagramInput2}</strong> returned a{" "}
                <strong>{data.trueOrFalseAnagram.toString()}</strong> result
              </li>
              <li> Logged at: {data.newTimeStamp}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default AnagramForm;

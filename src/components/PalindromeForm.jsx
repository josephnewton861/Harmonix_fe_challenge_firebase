import React, { useState, useEffect } from "react";
import firebase from "../firebase";
import { Button } from "react-bootstrap";

const PalindromeForm = () => {
  const [palindromeInputBox, setPalindromeInputBox] = useState([]);
  const [palindromeList, setPalindromeList] = useState([]);
  const [sortedField, setSortedField] = useState("asc");
  const [showPalindromeList, setPalindromeShowList] = useState(false);

  const isPalindrome = (str) => {
    if (typeof str !== "string") return "Input requires a string";

    for (let i = 0; i < str.length; i++) {
      if (str[i] !== str[str.length - 1 - i]) {
        return false;
      }
    }
    return true;
  };

  const sorted =
    palindromeList &&
    palindromeList.sort((a, b) => {
      const isReversed = sortedField === "asc" ? 1 : -1;
      return isReversed * a.timestamp.localeCompare(b.timestamp);
    });

  const onSort = (sortedField) => {
    setSortedField(sortedField);
  };

  const handlesPalindromeChange = (event) => {
    setPalindromeInputBox(event.target.value);
  };

  function handlesNewLog(event) {
    let oldTimeStamp = new Date();

    let year = oldTimeStamp.getFullYear();
    let month = oldTimeStamp.getMonth();
    let day = oldTimeStamp.getDate();
    let hours = oldTimeStamp.getHours();
    let minutes = oldTimeStamp.getMinutes();

    let newTimeStamp = `${day}/${month}/${year} ${hours}:${minutes}`;

    event.preventDefault();
    firebase
      .firestore()
      .collection("items")
      .add({
        palindromeInput: palindromeInputBox,
        timestamp: newTimeStamp,
        trueOrFalsePalindrome: isPalindrome(palindromeInputBox),
      });
  }

  const [todos, setTodos] = useState([]);
  function useLogs() {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("items")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) => {
          const newLogs = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPalindromeList(newLogs);
        });
      return () => unsubscribe();
    }, []);
    return todos;
  }
  const newTodos = useLogs();

  return (
    <div>
      <input
        className="palindromeInput"
        type="text"
        onChange={handlesPalindromeChange}
      />
      <Button variant="primary" onClick={handlesNewLog}>
        Log palindrome
      </Button>
      {isPalindrome(palindromeInputBox) === false ? (
        <p className="resultFalse">Output = False</p>
      ) : (
        <p className="resultTrue">Output = True</p>
      )}
      <Button
        className="showAndHide"
        onClick={() => setPalindromeShowList(!showPalindromeList)}
      >
        Show previous logs
      </Button>
      <Button className="sort" variant="info" onClick={() => onSort("desc")}>
        Newest logs
      </Button>
      <Button className="sort" variant="info" onClick={() => onSort("asc")}>
        oldest logs
      </Button>
      {showPalindromeList &&
        palindromeList &&
        sorted.map((data) => {
          return (
            <ul className="unList" key={data.id}>
              <li>
                The word {data.palindromeInput} returned a{" "}
                {data.trueOrFalsePalindrome.toString()} result
              </li>
              <li>Logged at: {data.timestamp}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default PalindromeForm;

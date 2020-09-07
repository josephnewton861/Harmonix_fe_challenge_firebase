import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const PalindromeForm = () => {
  const [palindromeInputBox, setPalindromeInputBox] = useState([]);
  const [palindromeList, setPalindromeList] = useState([]);
  const [sortedField, setSortedField] = useState("asc");

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

    // console.log(newTimeStamp);

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
      <input type="text" onChange={handlesPalindromeChange} />
      <button onClick={handlesNewLog}>Log palindrome</button>
      <button onClick={() => onSort("desc")}>Newest logs</button>
      <button onClick={() => onSort("asc")}>oldest logs</button>
      {isPalindrome(palindromeInputBox) === false ? <p>False</p> : <p>True</p>}
      {palindromeList &&
        sorted.map((data) => {
          return (
            <ul key={data.id}>
              <li>{data.palindromeInput}</li>
              <li>{data.timestamp}</li>
              <li>{isPalindrome(palindromeInputBox)}</li>
              <li></li>
            </ul>
          );
        })}
    </div>
  );
};

export default PalindromeForm;

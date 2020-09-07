import React, { useState, useEffect } from "react";
import firebase from "../firebase";

const PalindromeForm = () => {
  const [palindromeInputBox, setPalindromeInputBox] = useState([]);
  const [palindromeList, setPalindromeList] = useState([]);

  const isPalindrome = (str) => {
    if (typeof str !== "string") return "Input requires a string";

    for (let i = 0; i < str.length; i++) {
      if (str[i] !== str[str.length - 1 - i]) {
        return false;
      }
    }
    return true;
  };

  const handlesPalindromeChange = (event) => {
    setPalindromeInputBox(event.target.value);
  };

  function handlesNewLog(event) {
    let oldTimeStamp = new Date();

    let year = oldTimeStamp.getFullYear();
    let month = oldTimeStamp.getMonth();
    let day = oldTimeStamp.getDate();

    let newTimeStamp = `${day}/${month}/${year}`;

    // console.log(newTimeStamp);

    event.preventDefault();
    firebase
      .firestore()
      .collection("items")
      .add({
        palindromeInput: palindromeInputBox,
        newTimeStamp,
        trueOrFalsePalindrome: isPalindrome(palindromeInputBox),
      });
  }

  const [todos, setTodos] = useState([]);
  function useLogs() {
    useEffect(() => {
      const unsubscribe = firebase
        .firestore()
        .collection("items")
        // .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          const newLogsPalindrome = snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setPalindromeList(newLogsPalindrome);
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
      {isPalindrome(palindromeInputBox) === false ? <p>False</p> : <p>True</p>}
      {palindromeList &&
        palindromeList.map((data) => {
          return (
            <ul>
              <li>{data.palindromeInput}</li>
              <li>{data.newTimeStamp}</li>
            </ul>
          );
        })}
    </div>
  );
};

export default PalindromeForm;

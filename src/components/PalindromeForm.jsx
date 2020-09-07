import React, { useState, useEffect } from "react";

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

  return (
    <div>
      <input type="text" onChange={handlesPalindromeChange} />
      <button>Log palindrome</button>
      {isPalindrome(palindromeInputBox) === false ? <p>False</p> : <p>True</p>}
    </div>
  );
};

export default PalindromeForm;

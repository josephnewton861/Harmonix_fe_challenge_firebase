import React, { useState } from "react";

const AnagramForm = () => {
  const [anagramInput1, setAnagramInput1] = useState([]);
  const [anagramInput2, setAnagramInput2] = useState([]);
  const [anagramList, setAnagramList] = useState([]);

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

  const handlesAnagramChange1 = (event) => {
    setAnagramInput1(event.target.value);
  };

  const handlesAnagramChange2 = (event) => {
    setAnagramInput2(event.target.value);
  };
  return (
    <div>
      <input type="text" onChange={handlesAnagramChange1} />
      <input type="text" onChange={handlesAnagramChange2} />
      <button>Log anagram</button>
      {isAnagram(anagramInput1, anagramInput2) === false ? (
        <p>False</p>
      ) : (
        <p>True</p>
      )}
    </div>
  );
};

export default AnagramForm;

import React from "react";

import "./App.css";
import Header from "./components/Header";
import PalindromeForm from "./components/PalindromeForm";
import AnagramForm from "./components/AnagramForm";

function App() {
  return (
    <div className="App">
      <Header />
      <PalindromeForm />
      <AnagramForm />
    </div>
  );
}

export default App;

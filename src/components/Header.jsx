import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="header">
      <h1>
        Harmonix code challenge{" "}
        <FontAwesomeIcon className="icon" size="lg" icon={faLaptop} />
      </h1>
    </div>
  );
};

export default Header;

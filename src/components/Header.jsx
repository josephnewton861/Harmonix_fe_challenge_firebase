import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLaptop } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  return (
    <div className="nav">
      <p className="header">
        Harmonix code challenge{" "}
        <FontAwesomeIcon className="icon" size="lg" icon={faLaptop} />
      </p>
    </div>
  );
};

export default Header;

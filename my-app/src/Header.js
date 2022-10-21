import React from "react";
import img from "./germany.png";

export default function Header() {
  return (
    <header>
      <div className="left-header">
        <img src={img} alt="img" className="german-logo" />
        <h2 className="header-title">Learn Deutsch</h2>
      </div>
      <div className="right-header">
        <a href="#" className="menu">
          Words
        </a>
        <a href="#" className="menu">
          Practice
        </a>
        <a href="#" className="menu">
          Listening
        </a>
      </div>
    </header>
  );
}

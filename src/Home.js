import React from "react";
import "./Home.css";
import image from './Images/Copy of Florence (9).png'

function Home() {
  return (
    <div className="Home" logo>
      <img
        className="about florence"
        src={image}
        alt="logo"
      />
    </div>
  );
}

export default Home;

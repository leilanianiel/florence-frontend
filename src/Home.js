import React from "react";
import "./Home.css";
import image from './Images/Home Page.png'

function Home() {
  return (
    <div className="Home">
      <img
        className="about florence"
        src={image}
        alt="Florence the invetory of the electic fridge."
      />
    </div>
  );
}

export default Home;

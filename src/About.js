import React from "react";
import "./About.css";
import image from './Images/About Florence.png'

function About() {
  return (
    <div className="About">
      <img 
        className="about florence"
        src={image}
        alt="Florence the invetory of the electic fridge."
      />
    </div>
  );
}

export default About;

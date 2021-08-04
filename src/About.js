import React from "react";
import "./About.css";
import image from './Images/Florence Image.png'

function About() {
  return (
    <div className="About">
      <img
        className="pictures rounded profile-pic"
        src={image}
        alt="Florence the invetory of the electic fridge."
      />
    </div>
  );
}

export default About;

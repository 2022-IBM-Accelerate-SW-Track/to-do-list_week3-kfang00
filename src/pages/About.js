import React, { Component } from 'react';
import "./About.css";
import headshot from "../assets/Kayla_Fang_Headshot.png";
  
export default class About extends Component {
  render() {
    return (
      <div>
        <div className = "split_left left">
          <div className='centered'>
            <img 
              className = "profile_image" 
              src = {headshot} 
              alt = "Kayla Fang Profile Pic" />
          </div>
        </div>
        <div className = "split_right right">
          <div className='centered'> 
            <p className = "about_header">- about me -</p>
            <h1 className = "name_title">kayla fang</h1> 
            <div className = "brief_description">
              Hi! My name is Kayla Fang. I am a rising junior at Stony Brook University, majoring in Computer Science and minoring in Digital Arts.  Currently, I am hoping to pursue a career in software development and have been pursuing technical internships in pursuit of that goal.  On my free time, I love reading, coding, journaling, and drawing!
            </div>
          </div>
        </div>
      </div>
    )
  }
}

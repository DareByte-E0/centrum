// NavigationPane.js
import React from 'react';
import './style.css'; // Import CSS file

const NavigationPane = () => {
  return (
    <div className="navigation-pane">
      <NavigationLink to="/study-groups" text="Study Groups" />
      <NavigationLink to="/opportunities" text="Opportunities" />
      <NavigationLink to="/feedback" text="Feedback" />
      <NavigationLink to="/notes" text="Notes" />
      <NavigationLink to="/services" text="Services" />
      <NavigationLink to="/lecturers-desk" text="Lecturers Desk" />
    </div>
  );
}

const NavigationLink = ({ to, text }) => {
  return (
    <a href={to} className="navigation-link">{text}</a>
  );
}

export default NavigationPane;

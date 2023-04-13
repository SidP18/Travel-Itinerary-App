import React, { useState } from "react";
import './event-card.css';
import {BsCheckCircleFill} from 'react-icons/bs';
import {BsXCircleFill} from 'react-icons/bs';

export const EventCard = ({ imageSrc, date, name, category, liked, disliked }) => {

  return (
    <div className="event-card">
      <div className="event-buttons">
        <button className="activityActionButton" onClick={liked}><BsCheckCircleFill/></button>
        <button className="activityActionButton" onClick={disliked}><BsXCircleFill/></button>
      </div>
      <img src={imageSrc} alt={name} className="event-image" />
      <div className="event-details">
        <div className="event-date">{date}</div>
        <div className="event-name">{name}</div>
        <div className="event-category">{category}</div>
      </div>
    </div>
  );
};

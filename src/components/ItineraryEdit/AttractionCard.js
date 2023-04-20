import React, { useState } from 'react';
import './attraction-card.css';

export const AttractionCard = (address, description, photo, subcategory, website, liked, disliked) => {

  return (
    <div className="card">
      <div className="card-body">
        <h4>{description}</h4>
        <div>
          <button className={"like"} onClick={liked}>
            <i className="fa fa-thumbs-up"></i> Like
          </button>
          <button className={"dislike"} onClick={disliked}>
            <i className="fa fa-thumbs-down"></i> Dislike
          </button>
        </div>
      </div>
    </div>
  );
}
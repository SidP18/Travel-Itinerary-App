import React from "react";
import './itinerary-edit.css';
import './restaurant-card.css';
import {BsFillHandThumbsDownFill} from 'react-icons/bs';
import {BsFillHandThumbsUpFill} from 'react-icons/bs';
import {BsCheckCircleFill} from 'react-icons/bs';
import {BsXCircleFill} from 'react-icons/bs';

export const RestaurantCard = ({ address, cuisine, description, dietaryRestrictions, hours, phoneNumber, website, photoUrl, rating, price, liked, disliked }) => {
  return (
    <div className="restaurant-card">
      <div className="restaurant-card__photo-container">
        <img className="restaurant-card__photo" src={photoUrl} alt={description} />
      </div>
      <div className="restaurant-card__details">
        <h2 className="restaurant-card__name">{description}</h2>
        <p className="restaurant-card__address">{address}</p>
        <p className="restaurant-card__cuisine">{cuisine}</p>
        <p className="restaurant-card__phone">{phoneNumber}</p>
        <p className="restaurant-card__website"><a href={website}>{website}</a></p>
        <div className="restaurant-card__rating-container">
          <span className="restaurant-card__rating">{rating}</span>
        </div>
        <p className="restaurant-card__price">{price}</p>
        <div className="restaurant-card__buttons">
          <button className="restaurant-card__like-button" onClick={liked}>Like</button>
          <button className="restaurant-card__dislike-button" onClick={disliked}>Dislike</button>
        </div>
      </div>
    </div>
  );
};
import React from "react";
import './itinerary-edit.css';
import {BsFillHandThumbsDownFill} from 'react-icons/bs';
import {BsFillHandThumbsUpFill} from 'react-icons/bs';

export const ActivityCard = ({ category, image, name, description }) => {
    return (
        <div style={styles.container}>
          <div style={styles.categoryContainer}>
            <p style={styles.category}>{category}</p>
            <button className="activityActionButton"><BsFillHandThumbsUpFill/></button>
            <button className="activityActionButton"><BsFillHandThumbsDownFill/></button>
          </div>
          <div style={styles.imageContainer}>
            <img style={styles.image} src={image} aria-hidden alt={name} />
          </div>
          <div style={styles.infoContainer}>
            <h2 style={styles.name}>{name}</h2>
            <p style={styles.description}>{description}</p>
          </div>
        </div>
      );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: '12px',
    borderRadius: '8px',
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    margin: '1rem'
  },
  categoryContainer: {
    flex: 1,
    marginRight: '12px',
  },
  category: {
    fontSize: '16px',
    fontWeight: 'bold',
    margin: '0',
  },
  imageContainer: {
    flex: 1,
    marginRight: '12px',
  },
  image: {
    width: '100%',
    height: 'auto',
    maximumHeight: '2rem',
    borderRadius: '8px',
  },
  infoContainer: {
    flex: 2,
  },
  name: {
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '0',
    marginBottom: '8px',
  },
  description: {
    fontSize: '16px',
    margin: '0',
  },
};
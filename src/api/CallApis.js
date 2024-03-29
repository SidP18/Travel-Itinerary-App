import axios from "axios";
import React, { useState, useContext } from "react";
import Geohash from 'latlon-geohash';

const apiKey = 'qBiObBkq78P56RhguZAIwtdAX6T9RAfs';
const endpoint = 'https://app.ticketmaster.com/discovery/v2/events.json';
const RURL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';
const AURL = 'https://travel-advisor.p.rapidapi.com/attractions/list-by-latlng';

function getOptions(coords) {
    return ({ method: 'GET',
  params: {
    latitude: coords.lat,
    longitude: coords.lng,
    limit: '30',
    currency: 'USD',
    distance: '2',
    open_now: 'false',
    lunit: 'km',
    lang: 'en_US'
  },
  headers: {
    'X-RapidAPI-Key': '5ae6788d7emshcd55b6020afdd20p1e2922jsn19c127ff040e',
    'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
  }});
}

export const getData = async (coords, dates) => {

    var foods = {}
    var atts = {}
    var events = {}

    var options = getOptions(coords)
    console.log(coords)
    try {
        const { data: { data } } = await axios.get(RURL, options);
        console.log(data)
        foods = data;
    }catch (error){
        console.log("Failed to get api data", error)
    }

    try {
        const { data: { data } } = await axios.get(AURL, options);
        console.log(data)
        atts = data;
    }catch (error){
        console.log("Failed to get api data", error)
    }

    var geo = Geohash.encode(coords.lat, coords.lng, 7)
    // Set up the API request URL
    // console.log(geo)
    console.log(dates)
    //&startDateTime=${dates.startDate}&endDateTime=${dates.endDate}
    const url = `${endpoint}?apikey=${apiKey}&geoPoint=${geo}`;
    // Fetch data from the API
    await fetch(url)
      .then(response => response.json())
      .then(data => {
        // Log some basic information about the events
        //console.log(data._embedded.events);
        var data_list = []
        
        data._embedded.events.forEach(event => {
          var temp = event
          if (event.hasOwnProperty('priceRanges')){
            temp.priceRanges[0].min = String(event.priceRanges[0].min)
            temp.priceRanges[0].max = String(event.priceRanges[0].max)
          }
          data_list.push(temp)
        });
        events = data_list;
        console.log(events)
        
        // TODO: Pass email and data to es database here
      
      })
      .catch(error => console.log(error));

    return {foods, atts, events}

}
import axios from "axios";

const URL = 'https://travel-advisor.p.rapidapi.com/restaurants/list-by-latlng';

const options = {
  method: 'GET',
  params: {
    latitude: '47.62557',
    longitude: '-122.334388',
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
  }
};

export const getPlaceData = async () => {
    try {
        const { data: { data } } = await axios.get(URL, options);
        return data;
    }catch (error){
        console.log("Failed to get api data", error)
    }
}
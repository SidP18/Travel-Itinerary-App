const apiKey = 'qBiObBkq78P56RhguZAIwtdAX6T9RAfs';
const endpoint = 'https://app.ticketmaster.com/discovery/v2/events.json';

// Get user input for city and state
const city = 'Columbus';
const state = 'OH';

export function getEvents(city, state) {
    // Set up the API request URL
    const url = `${endpoint}?apikey=${apiKey}&city=${city}&stateCode=${state}`;
    // Fetch data from the API
    fetch(url)
      .then(response => response.json())
      .then(data => {
        // Log some basic information about the events
        //console.log(data._embedded.events);
        return(data._embedded.events);
        data._embedded.events.forEach(event => {
          console.log(event.name);
          console.log(event.dates.start.localDate);
          console.log(event._embedded.venues[0].name);
          console.log('-------------------------');
        });
      })
      .catch(error => console.log(error));
}
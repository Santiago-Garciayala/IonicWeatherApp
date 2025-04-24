USER GUIDE:

This application displays the current weather and the weather forecast in 3 hour intervals for the next 5 days of your selected city. By default it uses the city you are currently in, but using the search bar you can look up the weather for other cities. The forecasts can be scrolled sideways with touch gestures or a scroll wheel. 

The search bar displays up to 5 city suggestions matching what the user has typed, and they can be navigated to by clicking enter or clicking on one of the usggestions. 

There is a toggle on the top right corner that changes between metric and imperial units. This preference is saved between sessions.


IMPLEMENTATION DETAILS:

The application gets the users current coordinates using the Capacitor Geolocation plugin, and it then uses them to get weather information from the Open Weather Map API. The cities from the search bar are also retrieved from the Open Weather Map API.

It uses the Ionic Storage Module for Angular to store the unit preference of the user (Celsius or Fahrenheit).

It uses 1-way and 2-way data binding extensively throughout the home page in order to display the weather data received from the API as well as to handle user inputs.

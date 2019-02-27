# Entertainment-Event-Search
AJAX/JSON/HTML5/Bootstrap/Angular 2+/jQuery/Node.js/AWS Cloud

 URL:
 http://jiaozhangHW8.us-east-2.elasticbeanstalk.com 

To create a webpage that allows users to search for events using the Ticketmaster API and display the results on the same page below the form.

It contains:
-- Search Form:
  `Keyword Autocomplete: Autocomplete is implemented by using the suggestion service provided by Ticketmaster.(HTTP request to the Ticketmaster API)
  `Keyword Validation
  `Obtaining User Location: Using one of the geolocation APIs.(http://ip-api.com/json)
  `Search Execution
  
-- Search:
It will make an AJAX call to the Node.js script hosted on AWS. The Node.js script on GAE/AWS/Azure will then make a request to Ticketmaster API to get the events information.

-- Results Table:
  Details Button
  Highlighting
  Favorite Button
  
-- Details Table:
  Info tab
  Artist/Team(s) Tab: Spotify API
  Venue Tab: Angular Google Maps(Google Maps JavaScript Library)
  Upcoming Events Tab: Songkick API

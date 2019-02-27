const express = require('express')
const router = express()
var request = require('request');

var geohash = require('ngeohash');
var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
var spotifyApi = new SpotifyWebApi({
  clientId: '9ac03d9cf93a49afb78897b6b3bd31a2',
  clientSecret: '876bcc45665845d5bade114a5aa7fb5c'
});

// Set an access token.
spotifyApi.clientCredentialsGrant()
  .then(function(data) {
    //console.log('The access token expires in ' + data.body['expires_in']);
    //console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });

router.get('/auto', (req, res) => {
    let keyword = req.query.keyword.replace(/' '/g,'+');
    let url = "https://app.ticketmaster.com/discovery/v2/suggest?apikey=AEspB9kAGkSilYqubZEKXEWmncotq9bQ&keyword=" + keyword;
    console.log(url);
    request(url, (err,response, data) => {
        if (err) {
            console.log(err);
            res.json({success: false});
        } else {
            //console.log(JSON.parse(data));
            res.json(JSON.parse(data));
        }
    });
})

router.get('/location', (req, res) => {
    let detailLocation = req.query.location.replace(/' '/g,'+');
    let url = 'https://maps.googleapis.com/maps/api/geocode/json?address='+detailLocation+'&key=AIzaSyCqBNJcrrqBtKtzs5ClUOmQRdKMotxUA7A';
    console.log(url);
    request(url, (err,response, data) => {
        if (err) {
            console.log(err);
            res.json({success: false});
        } else {
            //console.log(JSON.parse(data));
            res.json(JSON.parse(data));
        }
    });
})

router.get('/events', (req, res) => {
    let keyword = req.query.keyword.replace(/' '/g,'+');
    let geo = geohash.encode(req.query.lat, req.query.lng);
    //console.log(geo);
    //let gro = '9q5cs';
    // prints ww8p1r4t8
    var latlon = geohash.decode('ww8p1r4t8');
    //https://app.ticketmaster.com/discovery/v2/events.json?apikey=AEspB9kAGkSilYqubZEKXEWmncotq9bQ&keyword=maroon&segmentId=KZFzniwnSyZfZ7v7nJ&radius=10&unit=miles&geoPoint=9q5csnnnv
    //var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=AEspB9kAGkSilYqubZEKXEWmncotq9bQ&keyword=maroon&segmentId=&radius=10&unit=Miles&geoPoint=9q5csnnn'
    //var url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=AEspB9kAGkSilYqubZEKXEWmncotq9bQ&keyword=pink&segmentId=KZFzniwnSyZfZ7v7nJ&radius=10&unit=miles&geoPoint=9q5cs';
    let url = 'https://app.ticketmaster.com/discovery/v2/events.json?apikey=AEspB9kAGkSilYqubZEKXEWmncotq9bQ&keyword='+keyword+'&segmentId='+req.query.segmentId+'&radius='+req.query.radius + '&unit=' + req.query.unit + '&geoPoint='+geo;
    //console.log(url);
    request(url, (err,response, data) => {
        if (err) {
            console.log(err);
            res.json({success: false});
        } else {
            //console.log(JSON.parse(data));
            res.json(JSON.parse(data));
        }
    });
})

router.get('/music', (req, res) => {
    console.log(req.query.attName);
    spotifyApi.searchArtists(req.query.attName).then(
        function(data) {
           //console.log('Search artists by Attraction Name', data.body);
           res.json(data.body);
        }, function(err) {
            res.json({success: false});
           console.log(err);
    });

})

router.get('/photo', (req, res) => {
    let searchKey = decodeURI(req.query.searchKey).replace(/%20/g,'+');
    //let searchKey = "pink";
    let url = 'https://www.googleapis.com/customsearch/v1?q='+searchKey+'&cx=011883370284690752163:ibskdrk1dr0&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyBCgPFuNHsKbgTFpjmdwzBjDipfX0NoTDQ';
    //let photo_url = 'https://www.googleapis.com/customsearch/v1?q='+searchKey+'&cx=011883370284690752163:ibskdrk1dr0&imgSize=huge&imgType=news&num=8&searchType=image&key=AIzaSyCqBNJcrrqBtKtzs5ClUOmQRdKMotxUA7A';
    //console.log(url);
    request(url, (err,response, data) => {
        if (err) {
            res.json({success: false});
            console.log(err);
        } else {
            //console.log(JSON.parse(data));
            res.json(JSON.parse(data));
        }
    });
})
router.get('/getID', (req, res) => {
    //let venueName = decodeURI(req.query.venue).replace(new RegExp(' ','g'),'+');
    console.log(req.query.venue);
    const venue_url = "https://api.songkick.com/api/3.0/search/venues.json?query="+req.query.venue+"&apikey=WovPOEyxzRXpKhBe";
    request(venue_url, (err,response, data) => {
        if (err) {
            res.json({success: false});
            console.log(err);
        } else {
            //console.log(JSON.parse(data));
            res.json(JSON.parse(data));
        }
    });
})
router.get('/upComing', (req, res) => {
    console.log(req.query.ID);
    const song_url = "https://api.songkick.com/api/3.0/venues/"+req.query.ID+"/calendar.json?apikey=WovPOEyxzRXpKhBe";
    console.log(song_url);   
    //const song_url = "https://api.songkick.com/api/3.0/venues/65/calendar.json?apikey=WovPOEyxzRXpKhBe";
    request(song_url, (err,response, data) => {
        if (err) {
            res.json({success: false});
            console.log(err);
        } else {
            //console.log(JSON.parse(data));
            res.json(JSON.parse(data));
        }
    });
})
module.exports = router
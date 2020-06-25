const express = require('express');
const app = express();
var Twit = require('twit');
const LanguageDetect = require('languagedetect');
var cors = require('cors');
let nodeGeocoder = require('node-geocoder');

const lngDetector = new LanguageDetect();

require('dotenv/config');

let options = {
  provider: 'mapquest',
  apiKey : process.env.MAP_QUEST_CONSUMER_KEY
};
 
let geoCoder = nodeGeocoder(options);

app.use(cors());

app.set('view engine', 'pug');
app.use(express.static('public'))

const routes = require('./routes/index');

app.use('/', routes);

var server = app.listen(3000);

var io = require('socket.io').listen(server);
io.set('origins', '*:*');
app.options('*', cors());

var T = new Twit({
    consumer_key:         process.env.TWITTER_API_KEY,
    consumer_secret:      process.env.TWITTER_API_SECRET_KEY,
    access_token:         process.env.TWITTER_ACCESS_KEY,
    access_token_secret:  process.env.TWITTER_ACCESS_SECRET_KEY,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
    strictSSL:            true,     // optional - requires SSL certificates to be valid.
  })

allTweets = [];

var stream = T.stream('statuses/filter', { track: 'blm,racism,blacklivesmatter,alllivesmatter', language: 'en'})

io.on('connection', function(socket) {
    stream.on('tweet', function (tweet) {
            if(tweet.place != null) {
                geoCoder.geocode(tweet.place.full_name)
                .then((res)=> {
                  var convertedTweet = {};
                  convertedTweet['lat'] = res[0]['latitude'];
                  convertedTweet['long'] = res[0]['longitude'];
                  convertedTweet['tweet'] = tweet.text;
                  io.sockets.emit("tweet", convertedTweet);
                })
                .catch((err)=> {
                });             
            }
        });
});


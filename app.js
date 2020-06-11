const express = require('express');
const app = express();
var Twit = require('twit');
var cors = require('cors');

require('dotenv/config');

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

io.on('connection', function(socket) {
    var stream = T.stream('statuses/filter', { track: 'blm' })
 
    stream.on('tweet', function (tweet) {
        console.log("sending tweet");
        io.emit('tweet',{ 'tweet': tweet });
    })
});
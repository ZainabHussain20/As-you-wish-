var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var session = require('express-session');
var passport = require('passport');
const axios = require('axios');

require('dotenv').config()
require('./config/database')
require('./config/passport');

var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')
const gameRouter = require('./routes/games')
const wishListRouter = require('./routes/wishList')
var app = express()



// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
//Google Auth session 
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));
app.use(express.json());

const CLIENT_ID = process.env.TWITCH_CLIENT_ID;
const CLIENT_SECRET = process.env.TWITCH_CLIENT_SECRET;
let accessToken = '';

// Function to get access token from Twitch
async function getAccessToken() {
  const response = await axios.post('https://id.twitch.tv/oauth2/token', null, {
      params: {
          client_id: CLIENT_ID,
          client_secret: CLIENT_SECRET,
          grant_type: 'client_credentials'
      }
  });
  accessToken = response.data.access_token;
}


//Google Auth passport 

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.use('/games', gameRouter)
app.use('/wishList', wishListRouter)
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// Endpoint to get games from IGDB
app.get('/games', async (req, res) => {
  try {
      const response = await axios.post('https://api.igdb.com/v4/games', 
      `fields id, name, genres.name, release_dates.human; limit 10;`, {
          headers: {
              'Client-ID': CLIENT_ID,
              'Authorization': `Bearer ${accessToken}`,
              'Accept': 'application/json'
          }
      });
      res.json(response.data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
});


// Middleware to ensure we have a valid access token
app.use(async (req, res, next) => {
  if (!accessToken) {
      await getAccessToken();
  }
  next();
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app

const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// Requiring models and services
require('./models/User');
require('./models/Survey');
require('./services/passport');

// Requiring routes
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');
const surveyRoutes = require('./routes/surveyRoutes');

// Requiring all the api keys
const keys = require('./config/keys');

// Connecting mongoose to mongoDB server
mongoose.connect(keys.mongoURI);

// Calling express app
const app = express();

// Calling body parser middleware
app.use(bodyParser.json())

// Enable cookies
app.use(cookieSession({
	maxAge: 30 * 24 * 60 * 60 * 1000,
	keys: [keys.cookieKey]
}));

// Ask passport to use cookies
app.use(passport.initialize());
app.use(passport.session());

// calling route function
authRoutes(app);
billingRoutes(app)
surveyRoutes(app);

// Handle serving on react files
if (process.env.NODE_ENV === 'production') {
	// Serve up all the production assets
	app.use(express.static('client/build'))

	// Server index.html route not recognize 
	const path = require('path');
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
	});
}

if (process.env.NODE_ENV !== 'production') {
	app.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
}

// Assigning port 
const PORT = process.env.PORT || 5000;

// Listening to the port
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
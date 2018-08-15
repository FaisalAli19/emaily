const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const bodyParser = require('body-parser');

// Requiring routes
const authRoutes = require('./routes/authRoutes');
const billingRoutes = require('./routes/billingRoutes');

// Requiring all the api keys
const keys = require('./config/keys');

// Requiring models
require('./models/User');
require('./services/passport');

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

// Assigning port 
const PORT = process.env.PORT || 5000;

// Listening to the port
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
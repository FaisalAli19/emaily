const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');

const User = mongoose.model('users');

passport.serializeUser((user, done) =>  done(null, user.id));

passport.deserializeUser((id, done) => {
	User.findOne({ _id: id }).then(user => done(null, user));
});

passport.use(new GoogleStrategy({
	clientID: keys.googleClientID,
	clientSecret: keys.googleClientSecret,
	callbackURL: '/auth/google/callback'
	}, (accessToken, refreshToken, profile, done) => {
		User.findOne({ googleId: profile.id })
			.then(existingUser => {
				if (existingUser) {
					// We already have a user 
					done(null, existingUser);
				}else{
					// We dont have a user create one
					new User({ googleId: profile.id }).save()
						.then(user => done(null, user));
				}
			});
	})
);
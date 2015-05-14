var bcrypt   = require('bcrypt-nodejs');
var mongoose = require('mongoose');
Schema = mongoose.Schema;

// define the schema for our user model
var UserSchema = new Schema({
    local            : {
        email        : String,
        password     : String,
    },
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    }
});

UserSchema.statics.AddUnique = function(profile, accessToken, callback) { 
    var User = mongoose.model('Users');
    User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
        // if there is an error, stop everything and return that
        // ie an error connecting to the database
        if (err)
            callback(err);

        // if the user is found, then log them in
        if (user) {
            callback(null, user); // user found, return that user
        } else {
            // if there is no user found with that facebook id, create them
            var newUser            = new User();

            // set all of the facebook information in our user model
            newUser.facebook.id    = profile.id; // set the users facebook id                   
            newUser.facebook.token = accessToken; // we will save the token that facebook provides to the user                    
            newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName; // look at the passport user profile to see how names are returned
            newUser.facebook.email = profile.emails[0].value; // facebook can return multiple emails so we'll take the first

            // save our user to the database
            newUser.save(function(err) {
                if (err)
                    throw err;

                // if successful, return the new user
                callback(null, newUser);
            });
        }
    });
}

// checking if password is valid using bcrypt
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


// this method hashes the password and sets the users password
UserSchema.methods.hashPassword = function(password) {
    var user = this;

    // hash the password
    bcrypt.hash(password, null, null, function(err, hash) {
        if (err)
            return next(err);

        user.local.password = hash;
    });
};

// create the model for users and expose it to our app
module.exports = mongoose.model('Users', UserSchema);
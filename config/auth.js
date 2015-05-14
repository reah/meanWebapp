// expose config directly to app using module.exports
module.exports = {

    'facebookAuth' : {
        'clientID'      : 1482832468673869, // your App ID
        'clientSecret'  : '3f46bc043ee6a0efcb605f3149a5d9f9', // your App Secret
        'callbackURL'   : 'http://localhost:3000/auth/facebook/callback'
    },

//  WILL DO THIS LATER
    'twitterAuth' : {
        'consumerKey'       : 'your-consumer-key-here',
        'consumerSecret'    : 'your-client-secret-here',
        'callbackURL'       : 'http://localhost:8080/auth/twitter/callback'
    },

    'googleAuth' : {
        'clientID'      : 'your-secret-clientID-here',
        'clientSecret'  : 'your-client-secret-here',
        'callbackURL'   : 'http://localhost:8080/auth/google/callback'
    }
};
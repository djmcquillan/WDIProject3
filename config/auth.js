/////////// Step 8 ///////////
module.exports = {
  'facebookAuth': {
      'clientID': '1208037839222800',
      'clientSecret': '0714e32362b489e580f18319a1a2a44b',
      'callbackURL': 'https://warm-inlet-6359.herokuapp.com/auth/meetup/callback',
      'profileFields': ['emails', 'displayName']
  },

  'meetupAuth': {
  	'client_id':'76eahb4rbbjghdtl7v69s6ir9a',
  	'client_secret':'5jtbnt0964s9qdrl3f2edlbpnk',
  	// 'grant_type':'authorization_code',
  	'redirect_uri':'https://warm-inlet-6359.herokuapp.com/auth/meetup/callback'
  	// 'code':'d890efbb4c73fa9db0d5a6726fb281ef'

  }
}
///////// End Step 8 /////////
// access_token → 5d94f6d3b49de3c51d2c786d69f5934b
// refresh_token → 1dc71b6bcaa6b17968873d5ec707e3ea
// token_type → bearer
// expires_in → 3600

// "access_token": "38b91e39376d9246a2826ca13e222989",
//   "refresh_token": "a690212888f16095f86c0ef581741bc7",
//   "token_type": "bearer",
//   "expires_in": 3600
//https://secure.meetup.com/oauth2/access?client_id=76eahb4rbbjghdtl7v69s6ir9a&client_secret=5jtbnt0964s9qdrl3f2edlbpnk&grant_type=authorization_code&redirect_uri=https://www.getpostman.com/oauth2/callback&code=d890efbb4c73fa9db0d5a6726fb281ef
//callback from meetup:  'https://secure.meetup.com/oauth2/authorize?client_id=76eahb4rbbjghdtl7v69s6ir9a&response_type=token&redirect_uri=https://127.0.0.1:3000'
require('dotenv').config();
const {
  ENV,
  API_URL,
  FACEBOOK_CLIENT_ID,
  FACEBOOK_CLIENT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET
} = process.env;

module.exports = {
  env: ENV,
  apiUrl: API_URL,
  facebookClientId: FACEBOOK_CLIENT_ID,
  facebookClientSecret: FACEBOOK_CLIENT_SECRET,
  googleClientId: GOOGLE_CLIENT_ID,
  googleClientSecret: GOOGLE_CLIENT_SECRET
};

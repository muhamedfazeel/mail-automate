const { google } = require("googleapis");
const {
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
} = require('./constants');

module.exports.oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);

export default {
  url: process.env.REACT_APP_URL,
  issuer: process.env.REACT_APP_ISSUER,
  redirect_uri: window.location.origin + "/implicit/callback",
  client_id: process.env.REACT_APP_CLIENT_ID,
};

module.exports = {
  // server process.env.XXXX
  // these already exist as environment variables on the server but will need to be added locally
  memegenUsername: process.env.memegenUsername,
  memegenPassword: process.env.memegenPassword,
  imgurClientID: process.env.imgurClientID,
  dbUsername: process.env.dbUsername,
  dbPassword: process.env.dbPassword,
  devSocketPort: 3434, // whatever your socket port of choice is
  // client ng-constant
  appId: '1FA8E626', // retrieved from google cast developer dashboard
  devSocketHost: 'ws://127.0.0.1:3434', // or whatever you use for your socket server
  chromecastNamespace: 'urn:x-cast:vandelay.industries',
  devApi: 'http://localhost:8000', // or whatver your dev server is
  prodApi: 'https://thawing-eyrie-5425.herokuapp.com' // wherever you deploy in production, we used heroku
};

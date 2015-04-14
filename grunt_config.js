module.exports = {
  // server process.env.XXXX
  memegenUsername: process.env.memegenUsername,
  memegenPassword: process.env.memegenPassword,
  devSocketPort: 3434, // whatever your socket port of choice is
  // client ng-constant
  appId: '1FA8E626', // retrieved from google cast developer dashboard
  devSocketHost: 'ws://127.0.0.1:3434', // or whatever you use for your socket server
  chromecastNamespace: 'urn:x-cast:vandelay.industries',
  devApi: 'http://localhost:8000', // or whatver your dev server is
  prodApi: 'https://thawing-eyrie-5425.herokuapp.com' // wherever you deploy in production, we used heroku
};
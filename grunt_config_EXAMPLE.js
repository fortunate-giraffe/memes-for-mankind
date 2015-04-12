module.exports = {
  // server process.env.XXXX
  memegenUsername: 'your memegen api username memegenerator.net',
  memegenPassword: 'your memegen api password memegenerator.net',
  devSocketPort: 3434, // whatever your socket port of choice is
  // client ng-constant
  appId: 'your chromecast app id', // retrieved from google cast developer dashboard
  devSocketHost: 'ws://127.0.0.1:3434', // or whatever you use for your socket server
  chromecastNamespace: 'namespace for your chromecast message passing',
  devApi: 'http://localhost:8000', // or whatver your dev server is
  prodApi: 'protocol://hostname:port' // wherever you deploy in production, we used heroku
};

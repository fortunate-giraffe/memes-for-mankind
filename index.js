var app = require('./server/server.js');

app.listen(process.env.PORT || 8000);

console.log('Express server listening on 8000...');

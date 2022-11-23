const Logger = require('./logger');
const logger = new Logger();

logger.on('birnarsala', function({id, url}){
    console.log('Birnarsala worked!');
    console.log('id:', id);
    console.log('url: ', url);
})

logger.log('Message!');

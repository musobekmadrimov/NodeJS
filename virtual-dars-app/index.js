const express = require('express');
const app = express();
const categories = require('./routes/categories')
const home = require('./routes/home')
// const logger = require("./middleware/logger");
// const helmet = require("helmet");
// const auth = require("./auth");
// const morgan = require('morgan');
// const config = require('config');

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`${port}-portni eshityapman...`);
});

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(logger);
// app.use(auth);
// app.use(helmet());
// app.use(morgan('tiny'));
app.set('view engine', 'pug');
app.use('/api/categories', categories);
app.use('/', home);

// console.log(config.get('name'));
// console.log(config.get('mailserver.host'));
// console.log(config.get('mailserver.password'));





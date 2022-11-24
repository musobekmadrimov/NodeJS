const express = require("express");
const app = express();
const categories = require("./routes/categories");
const customers = require("./routes/customers");
const home = require("./routes/home");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/virtual-dars")
  .then(() => {
    console.log(
      "Virtual dars loyihasi ma'lumotlar bazasiga ulanish hosil qilindi...."
    );
  })
  .catch((err) => {
    console.error("MongoDB ga ulanish paytida xatolik ro'y berdi.", err);
  });

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`${port}-portni eshityapman...`);
});

app.use(express.json());
app.set("view engine", "pug");
app.use("/api/categories", categories);
app.use("/api/customers", customers);
app.use("/", home);
































// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.use(logger);
// app.use(auth);
// app.use(helmet());
// app.use(morgan('tiny'));
// const logger = require("./middleware/logger");
// const helmet = require("helmet");
// const auth = require("./auth");
// const morgan = require('morgan');
// const config = require('config');
// console.log(config.get('name'));
// console.log(config.get('mailserver.host'));
// console.log(config.get('mailserver.password'));






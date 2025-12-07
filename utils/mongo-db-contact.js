const mongoose = require('mongoose');

mongoose
  .connect('mongodb://localhost:27017/belajar-express-web-server')
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

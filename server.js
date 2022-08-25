const sequelize = require('./config/connection');
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening on ${PORT}`));
  });
const forceDatabaseRefresh = false;

import express from 'express';
import sequelize from './config/connection.js';
import routes from './routes/index.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to log incoming requests and headers
app.use((req, _res, next) => {
  console.log(`Incoming Request: ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);

  // Specifically log the X-Api-Key header
  if (req.headers['x-api-key']) {
    console.log('X-Api-Key:', req.headers['x-api-key']);
  } else {
    console.warn('X-Api-Key header is missing!');
  }

  next(); // Continue to the next middleware or route
});

// Serves static files in the entire client's dist folder
app.use(express.static('../client/dist'));

app.use(express.json());
app.use(routes);

sequelize.sync({ force: forceDatabaseRefresh }).then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
  });
});

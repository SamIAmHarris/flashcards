const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

//Setup the express app
const app = express();

//Middleware from 3rd party libs to parse the body and use cookies
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static('public'));

//Using pug as our template engine. Other options are ejs or mustache.
app.set('view engine', 'pug');

//Moving routes to separate modules for code organization.
const mainRoutes = require('./routes');
const cardRoutes = require('./routes/cards');
app.use(mainRoutes);
app.use('/cards', cardRoutes);

//Example middleware functions that need to call next to move the req along the pipeline/flow/etc
app.use((req, res, next) => {
  console.log("One");
  next();
});

app.use((req, res, next) => {
  console.log("Two");
  next();
});

//Put this after our normal routes/middleware in case we did not catch the location the user entered
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//Overriding the default error handling provided by Express with our own. 
//Believe this will be called whenever we pass an error with next(error) or a non 404 error.
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status); 
  res.render('error');
});

//Tell the app to listen on port 3000. 
//Interested in seeing how we change this for dev/prod and making it publicly accessible.
app.listen(3000, () => {
  console.log("The application is running on localhost:3000");
});

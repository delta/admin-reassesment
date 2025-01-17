const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
const session = require('express-session');
const connectDB = require('./config/db');
const logger = require('./config/logger');

dotenv.config({ path: './.env' });

connectDB();

const forms = require('./routes/forms');
const auth = require('./routes/auth');

const app = express();

app.use(express.json());

app.use(session({
  secret: process.env.COOKIE_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

if (process.env.NODE_ENV === 'dev') {
  app.use(morgan("combined", { "stream": logger.stream }));
}

const authMiddleware = (req, res, next) => {
  if (req.session.user) next();
  else return res.status(401).json({
    success: false,
    error: "Unauthorized User"
  })
}

app.use('/api/v1/forms', authMiddleware, forms);
app.use('/auth', auth);

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html')));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, logger.info({ message: `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`}));

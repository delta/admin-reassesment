const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const colors = require('colors');
const morgan = require('morgan');
var session = require('express-session');

const connectDB = require('./config/db');
const {authenticateUser, logoutUser} = require('./controllers/auth');

dotenv.config({ path: './config/config.env' });

connectDB();

const forms = require('./routes/forms');

const app = express();

app.use(express.json());

app.use(session({
  secret: 'move it to c0nf9g',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

if(process.env.NODE_ENV === 'dev') {
  app.use(morgan('dev'));
}

app.use('/api/v1/forms', forms);
app.use('/auth', authenticateUser);
app.use('/logout', logoutUser)

// if(process.env.NODE_ENV === 'production') {
//   app.use(express.static('client/build'));

//   app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
// }

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold));

const mongoose = require('mongoose');
const logger = require('../config/logger');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true
    });

    logger.info({ message: `MongoDB Connected: ${conn.connection.host}` });
  } catch (err) {
    logger.error({ message: `MongoDB Error: ${err.message}` });
    process.exit(1);
  }
}

module.exports = connectDB;

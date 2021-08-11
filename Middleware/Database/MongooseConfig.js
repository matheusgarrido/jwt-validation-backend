const mongoose = require('mongoose');
require('dotenv/config');

const { DB_URL } = process.env;

//Database Connection
const connection = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log('✔️  Successful database connection');
  } catch (error) {
    console.log('❌ Failed database connection');
    process.exit();
  }
};

//Disconnection log
mongoose.connection.on('disconnected', () => {
  console.log('⚠️  Database connection is closed');
});

//Close mongoose when system finishes
process.on('SIGINT', async () => {
  await mongoose.connection.close();
  process.exit();
});

//Connect the database
connection();

module.exports = { mongoose };

const mongoose = require('mongoose');
const { DB_NAME } = require('./constants');

mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}?retryWrites=true&w=majority`)
.then(() => {
    console.log('MongoDB Atlas is connected...');
})
.catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
});

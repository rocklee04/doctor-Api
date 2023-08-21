const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const userRoutes = require('./Routes/userRoutes');
// const doctorsRoutes = require('./Routes/doctorsRoutes');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

//connect to db
mongoose.connect(config.mongoURL)
.then(() => {
    console.log('Connected To DB')
}).catch((error) => {
    console.error(error);
}) 

app.use(express.json());

app.use('/user', userRoutes);
// app.use('/doctors', doctorsRoutes);

//Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
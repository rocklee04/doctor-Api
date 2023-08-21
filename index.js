const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./Routes/userRoutes');
const doctorRoutes = require('./Routes/doctorRoutes');
const dotenv = require('dotenv');
const authMiddleware = require('./Middlewares/authMiddleware');

dotenv.config();

const app = express();

//connect to db
mongoose.connect(process.env.mongoURL)
.then(() => {
    console.log('Connected To DB')
}).catch((error) => {
    console.error(error);
}) 

app.use(express.json());

app.use('/user', userRoutes);
app.use('/doctors', authMiddleware.verfiyToken, doctorRoutes);

//Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running at PORT ${PORT}`)
})
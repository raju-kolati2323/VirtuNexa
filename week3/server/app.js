const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routes/users.router');
const scheduleRouter = require('./routes/schedule.router');

const app = express();

// view engine setup
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())

app.use('/api', userRouter);
app.use('/api/schedule', scheduleRouter);


mongoose.connect(process.env.MONGODB_URL)
.then(()=>console.log('Database connected successfully.'))
.catch((err)=>console.log('Failed connecting to DB', err));

const port = process.env.PORT || 5000;
app.listen(port,()=>{
  console.log('Server is running at port ' + port)
});

module.exports = app;

const express=require('express');
const app=express();
const cookieParser=require('cookie-parser');
const env=require('dotenv').config();
const authRoute=require('./routes/auth');
const connectDB=require('./config/db');
const isUser=require('./middleware/auth');
const taskRouter=require('./routes/task');
connectDB();
app.use(cookieParser())
app.use(express.json());
app.use('/api',authRoute);
app.use('/api',isUser,taskRouter)
const PORT = process.env.PORT || 3000;
app.listen(PORT);
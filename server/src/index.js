import express from "express";
import cors from "cors"; //->communition between backend and frontend
import mongoose from "mongoose";

import {userRouter} from './routes/users.js'
import { blogRouter } from "./routes/blogs.js";

const path = require('path');
const app = express();
app.use(express.json()); //data from frontend convert into json;
app.use(cors());

app.use("/auth",userRouter);
app.use("/blog",blogRouter);

mongoose.connect(
    "mongodb+srv://Blog:blog_lpu73@cluster0.zady7zg.mongodb.net/Cluster0?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
);

app.use(express.static(path.join(__dirname,'./client/blog/build')));
app.get('*',function(req,res){
  res.sendFile(path.join(__dirname,'./client/build/blog/index.html'));
});
app.listen(1000, () => console.log("Server Started!!"));






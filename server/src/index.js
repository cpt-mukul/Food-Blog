import express from "express";
import cors from "cors"; //->communition between backend and frontend
import mongoose from "mongoose";
import path from 'path';
import { fileURLToPath } from 'url';
import {userRouter} from './routes/users.js'
import { blogRouter } from "./routes/blogs.js";

// const path = require('path');
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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__filename,'./client/blog/build')));

app.get('*',function(req,res){
  res.sendFile(path.join(__filename,'./client/build/blog/index.html'));
});
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server Started!!${port}`));






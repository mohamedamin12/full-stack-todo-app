require("dotenv").config();
const express = require("express");
const compression = require('compression')
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;
const url = process.env.MONGO_URL;

const todoRoute = require("./routes/todo.route");


app.use(cors());
app.use(compression())  

app.use(express.json());
app.use(express.urlencoded({extended: false}));

//* end point
app.use("/api/todos", todoRoute);



mongoose
  .connect(url)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });

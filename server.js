const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();

// Connect to db
mongoose.connect(process.env.DB_CONNECTION, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false
});

// Routes
const subscriberRoutes = require("./routes/subscriberRoutes");

// Middlewares
app.use(express.json());

app.use("/subscriber", subscriberRoutes);

const db = mongoose.connection;
db.on("error", error => console.error(error));
db.once("open", _ => console.log("Connected to Mongo Atlas"));

app.listen(8001);

const express = require("express");
const app = express();

// Getting the data from env file also
require("dotenv").config();

// Body Parser
app.use(express.json());

const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examRoute");
const resportsRoute = require("./routes/reportsRoute");


app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", resportsRoute);

// fetch the port no from the env file if u dont get then use port 4000.
const PORT = process.env.PORT||5000;

// Connecting with the database
const dbconnect = require("./config/dbconnect");

dbconnect();

app.listen(PORT,()=>{
    console.log(`listening on ${PORT} `)
})

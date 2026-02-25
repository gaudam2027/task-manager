const express = require('express')
require('dotenv').config()
const session = require('express-session');
const path = require('path')
const http = require('http')
const connectDB = require("./config/db");
const nocache = require('nocache');
const app = express()

connectDB();

app.use(nocache())

// Port
const Port = process.env.PORT || 3000;

// Routers
const userRouter = require("./routers/userRouter");
const taskRouter = require("./routers/taskRouter");

//middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 1000 * 60 * 60 }
}));

//view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

//user signIn
app.use("/", userRouter);
app.use("/", taskRouter);

// Create HTTP Server
const server = http.createServer(app);


server.listen(Port, () => {
  console.log(`Server running on http://localhost:${Port}`);
});
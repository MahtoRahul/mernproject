const dotenv = require("dotenv");
const mongoose = require ("mongoose");
const express = require ("express");
const app = express();

dotenv.config({path:"./config.env" });

require("./db/connect");
const User = require("./schema/userschema");

app.use(express.json());

app.use(require("./router/auth" ));

const PORT = process.env.PORT;


//Middleware
const middleware = (req,res,next) => {
   console.log("hello from middleware");
   next();
}

app.get("/", (req,res) => {
    res.send("hello world from the server");
 });
 app.get("/about", middleware, (req,res) => {
    res.send("hello world from the aboutus page");
 });
 app.get("/contact", (req,res) => {
    res.send("hello world from the contact page");
 });
 app.get("/signin", (req,res) => {
    res.send("hello world from the login page");
 });
 app.get("/signup", (req,res) => {
    res.send("hello world from the register page");
 });


app.listen(PORT, () => {
    console.log("server is running at port no 5000" );
});
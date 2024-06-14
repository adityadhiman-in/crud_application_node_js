//Imports  
import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import session from 'express-session';
import router from './routes/routes.js';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

//Database Connection
mongoose.connect(process.env.DB_URI);
const db = mongoose.connection;
db.on("error", (error)=> console.log("some error occured", error));
db.once("open", ()=> console.log("Connected to the database"));

//middlewares
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(express.static("uploads"))
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(session({
    secret:"Top Secret",
    saveUninitialized: true,
    resave: false
}));
app.use((req, res, next)=>{
    res.locals.message = req.session.message;
    delete req.session.message;
    next();
});
app.set("view engine", "ejs");

//routes prefix
app.use("",  router);

app.listen(port, ()=>{
    console.log(`Server listening on port http://localhost:${port}`);
})
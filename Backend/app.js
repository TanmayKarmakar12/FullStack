import express from 'express';
import { config } from 'dotenv';
import cors from "cors";
import {sendEmail} from './utils/sendEmail.js';

// 1. Load environment variables first
// Use the correct lowercase 'path' property
config({path: './config.env'}); 

const app = express();
const router = express.Router();

app.use(cors({
    origin: [process.env.FRONTED_URL],
    methods: ["POST"],
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({extended: true}));

router.post("/send/mail", async(req, res, next)=>{
    const {name, email, message, contact} = req.body;
    if(!name || !email || !message){
 return res.status(400).json({ 
    success: false,
 message: "Please provide all details",
 });
 }
    try {
        await sendEmail({
            email: "tanmaykarmakar87866@gmail.com",
            subject: "GYM WEBSITE CONTACT",
            message,
            contact,
            userEmail: email,
        });
        res.status(200).json({
            success: true,
            message: "Message sent successfully."
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        })
        
    }
})

router.get("/", (req, res, next)=>{
    res.json({success: true, message: "We are connected to the server"});
})

app.use(router);

app.listen(process.env.PORT, ()=>{
    // 2. The server will now log the correct port number
    console.log(`Server listening at Port ${process.env.PORT}`);
});
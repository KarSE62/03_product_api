import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import productRouter from "./routes/product.js";
import dotenv from 'dotenv'  //ให้รู้จักไฟล์
import cors from "cors";
dotenv.config();
 
//Create server
const app = express();
 
//Use Middleware
app.use(bodyParser.json({ limit: "30mb", extended: true }));  //แปลงให้อยู่ในรูปแบบ json
app.use(bodyParser.urlencoded({ limit: "30mb", extended: false }));  //เข้ารหัส URL
app.use(cors());

// Use Router
app.use("/api", productRouter);
 
const CONNECTION_URL = process.env.MONGODB_URL;  //กำหนดช่องทางการเชื่อมต่ออยู่ในไฟล์ ENV
 
const PORT = process.env.PORT || 5000;  //กำหนดหมายเลข port
 
//Connect to MongDB
mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true ,})
  .then(() => //ถ้าเชื่อมได้ให้โชว์
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )//ถ้าไม่ให้ให้แสดง error
  .catch((error) => console.log(error.message));
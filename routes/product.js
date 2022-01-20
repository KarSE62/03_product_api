import express from "express";
import Product from "../models/product.js";
const router = express.Router();

/*
*Create = post
*Read = get  == Get all // Get By Id
*Update = put
*Delete = delete
 */
 
router.get("/", (req, res) => {
  res.send("RestfulAPI");
});
 //Get all
 //http://localhost:5000/api/products
router.get("/products", async(req, res) => {
    const products = await Product.find({}); //เรียกใช่ฟังก์ชั่น find
    res.json(products);
});

 //Get By Id
 //http://localhost:5000/api/products/61cd68b46ace93a51fcb8fd1
router.get("/products/:id", async(req, res) => {
    const {id} = req.params; //ดึงพารามิเตอร์
    const product = await Product.findById(id); //เรียกใช้ฟังก์ชั่น findById ส่ง id ไปด้วย
    res.json(product); //แสดงในรูปแบบ json
});

 //Create new Product
 //http://localhost:5000/api/products
router.post("/products", async(req, res) => {
    const payload = req.body; 
    const product = new Product(payload); //ส่งข้อมูลไปสร้างชุดข้อมูล
    await product.save(); //save ลง MongoDB
    res.json({message:"Product added !!"})
});

 //Update Product By Id
 //http://localhost:5000/api/products/61cd6ab06ace93a51fcb8fd3
router.put("/products/:id", async(req, res) => {
    const {id} = req.params; //ดึงพารามิเตอร์
    const payload = req.body;//ดึงข้อมูลใหม่
    const product = await Product.findByIdAndUpdate(id,{$set:payload});
    res.json({message:`Product  id ${id} is Updated !!`})
});

 //Delete Product By Id
 //http://localhost:5000/api/products/61cd68b46ace93a51fcb8fd1
router.delete("/products/:id", async(req, res) => {
    const {id} = req.params; //ดึงพารามิเตอร์
    const product = Product.findById(id);
    await Product.findByIdAndDelete(id); //เรียกใช้ฟังก์ชั่น findByIdAndDelete ส่ง id ไปด้วย
    res.json({message:`Product  id ${id} is Deleted!!`})
});

export default router;
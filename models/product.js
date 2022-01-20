import  mongoose  from "mongoose";
const Schema = mongoose.Schema;
const productSchema = new Schema({  //กำหนดโครงสร้าง
    name: String,
    category: String,
    price: Number,
    tags: [String],
    imageURL: String,
});
const ProductModel = mongoose.model("Product", productSchema); //กำหนด ProductModel = productSchema
export default ProductModel;
const { default: mongoose, Schema } = require("mongoose");

class ProductModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String, required:true},
            alias:{type:String, required:true, unique:true},
            category:{type:Schema.Types.ObjectId, required:true, ref:"tbl_category"}
        }, {timestamps:true})

        this.model = mongoose.model("tbl_product", this.schema)
    }

    addProduct(data){
        return this.model.create(data)
    }

    updateProduct(data){
        return this.model.updateOne({_id:data._id}, {name:data.name, alias:data.alias, category:data.category})
    }

    deleteProduct(id){
        return this.model.deleteOne({_id:id})
    }

    getProduct(){
        return this.model.find().populate({path:"category"})
    }

}

const productModel = new ProductModel()

module.exports= productModel
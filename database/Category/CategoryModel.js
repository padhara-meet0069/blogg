const { default: mongoose } = require("mongoose");

class CategoryModel{
    constructor(){
        this.schema = new mongoose.Schema({
            name:{type:String,required:true},
            alias:{type:String, required:true, unique:true}
        }, {
            timestamps:true
        })

        this.model = mongoose.model("tbl_category", this.schema)
    }


    insertCategory(data){
        return this.model.create(data)
    }

    updateCategory(data){
        return this.model.updateOne({_id:data._id}, {name:data.name, alias:data.alias})
    }
    deleteCategory(id){
        return this.model.deleteOne({_id:id})
    }
    getCategory(){
        return this.model.find()
    }

}

const categoryModel = new CategoryModel()
module.exports = categoryModel
const express = require("express")
const productController = require("./ProductController")

const productRouter = express.Router()

productRouter.post("/" , productController.addProduct)
productRouter.put("/" , productController.updateProduct)
productRouter.delete("/:id" , productController.deleteProduct)
productRouter.get("/" , productController.getProduct)

module.exports = productRouter
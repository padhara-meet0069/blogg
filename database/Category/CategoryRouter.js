const express = require("express")
const categoryController = require("./CategoryController")

const categoryRouter = express.Router()


categoryRouter.post("/" , categoryController.addCategory)
categoryRouter.get("/" , categoryController.getCategory)
categoryRouter.put("/" , categoryController.updateCategory)
categoryRouter.delete("/:id" , categoryController.deleteCategory)


module.exports = categoryRouter
const express =  require("express");
const ConnectDb = require("./Connction");
const categoryRouter = require("./Category/categoryRouter");
const cors = require("cors");
const productRouter = require("./Product/ProductRouter");
require("dotenv").config()
const fileUpload = require("express-fileupload");
const fileRouter = require("./Files/FileRouter");
const PostRouter = require("./Post/PostRouter");
// const userRouter = require("./User/UserRouter");
// const Auth = require("./Auth");

const app = express()
app.use(express.json())
ConnectDb()


app.use(cors())
app.use(fileUpload())

// app.use("/user", userRouter)
app.use("/public" , express.static("./public"))


// app.use(Auth)
app.use("/category", categoryRouter)
app.use("/product", productRouter)
app.use("/file", fileRouter)
app.use("/post", PostRouter)


app.listen(process.env.PORT, () => {
    console.log("Server Started");
})

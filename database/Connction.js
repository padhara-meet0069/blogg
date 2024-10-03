const { default: mongoose } = require("mongoose");

async function ConnectDb(){
    try {
        await mongoose.connect(process.env.DB_URL)
        console.log("Db Connected");
    } catch (error) {
        console.log("Db Connection Loss");
    }
}

module.exports = ConnectDb
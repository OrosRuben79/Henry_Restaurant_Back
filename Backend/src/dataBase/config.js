const mongoose = require('mongoose');

const dbConnection = async()=>{

    try {

        mongoose.connect(process.env.MONGODB_CNN)
        console.log("Data Base Conneted");
    } catch (error) {
        console.log(error);
        throw new Error("Can't connect to Data Base")
    }

}

module.exports = {
    dbConnection
}
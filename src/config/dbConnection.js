const mongoose = require('mongoose');;

const dbConnection = async () => {
  try{
    console.log(process.env.MONGO_CONNEXION)
    await mongoose.connect(process.env.MONGO_CONNEXION);
    console.log("DB conectada")
  } catch(error) {
    console.log(error)
  }
}

module.exports = dbConnection;
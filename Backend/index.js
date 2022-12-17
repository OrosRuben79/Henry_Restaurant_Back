require("dotenv").config();
const server = require("./src/app");
const { dbConnection } = require("./src/dataBase/config");

dbConnection();
server.listen(0, () => {
  console.log("%s server on port");

});


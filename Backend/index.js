require("dotenv").config();
const server = require("./src/app");
const { dbConnection } = require("./src/dataBase/config");

dbConnection();
server.listen(3001, () => {
  console.log("%s listening at 3001");
});

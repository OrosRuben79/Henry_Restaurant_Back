require("dotenv").config();
const server = require("./src/app");
const { dbConnection } = require("./src/dataBase/config");

dbConnection();
server.listen(process.env.PORT, () => {
  console.log(`server on port ${process.env.PORT}`);
});

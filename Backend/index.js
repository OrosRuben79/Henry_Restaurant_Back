require("dotenv").config();
const server = require("./src/app");
const { dbConnection } = require("./src/dataBase/config");

dbConnection();
server.listen(server.get('port'), () => {
  console.log('server on port' + server.get('port'));
  console.log('server on port' + procesS.env.PORT)
});

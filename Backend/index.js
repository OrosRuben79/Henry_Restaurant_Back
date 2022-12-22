require("dotenv").config();

const server = require("./src/app");
const { dbConnection } = require("./src/dataBase/config");
const port = process.env.PORT || 0;

const myApp = server.listen(port, (err) => {
	if(err){
		return console.error(err)
	} 
  console.log("Server listening at ", myApp.address().port);  
});
dbConnection();
 

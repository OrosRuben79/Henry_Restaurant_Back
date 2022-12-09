const jwt_decode = require("jwt-decode");

const jwtDecode = (token) => {
  const tokenData = jwt_decode(token);
  const { name, picture, email } = tokenData;

  return {
    name,
    img: picture,
    email,
  };
};

module.exports = {
  jwtDecode,
};

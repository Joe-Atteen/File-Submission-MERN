const jwt = require("jsonwebtoken");

const Auth = (req, res, next) => {
  //EXTRACT TOKEN FROM AUTHORIZATION HEADER
  try {
    const authorizationHeader = req.get("Authorization");

    if (!authorizationHeader) throw new Error("Unauthenticated user!");

    const token = authorizationHeader.split(" ")[1];

    //verify the token with jwt
    const decodedToken = jwt.verify(token, "secretkey");

    if (!decodedToken) throw new Error("Unauthorized user!");

    req.userId = decodedToken.userId;

    next();
  } catch (error) {
    res.json({ Error: error.message });
  }
};

module.exports = Auth;

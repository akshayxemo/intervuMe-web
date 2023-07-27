const jwt = require("jsonwebtoken");
require("dotenv").config();
const Token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NGJhODY4YWQ0MTIyNTU2ZjBmOTVkMDAiLCJtZW50b3JJZCI6IjY0YmZmNjdkODdjYTZmODM2OTYzMWFlNCIsInNlc3Npb25EYXRlVGltZSI6IjIwMjMtMDctMjhUMTM6MzA6MDAuMDAwWiIsImlhdCI6MTY5MDQ4MjIwOX0.DuVLO6wQXMY4MzIm0D15yaxvXJNNsLl_4t02BPopj_w";
const check = async () => {
  const payload = await jwt.verify(Token, process.env.JWT_SECRET_KEY);
  console.log(payload);
};

check();

import jwt from "jsonwebtoken";

const generateTokenAndCookie = (userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    maxAge: 15 * 24 * 60 * 60 * 1000, // MS
    httpOnly: true, // prevent XSS attack also known as cross-site scripting attacks. This cookie is not accessable by Javascript.
    sameSite: "strict", // CSRF: unauthorized commands are submitted from a user that the web application trusts.
    secure: process.env.NODE_ENV !== "development",
  });
};

export default generateTokenAndCookie;

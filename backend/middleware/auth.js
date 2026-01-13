const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.cookies.token;
    console.log("AUTH TOKEN:", token); // DEBUG

    if (!token) return res.status(401).json({ msg: "No token" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED USER:", decoded); // DEBUG

    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("AUTH ERROR:", err);
    res.status(401).json({ msg: "Invalid token" });
  }
};

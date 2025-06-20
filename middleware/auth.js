const jwt = require('jsonwebtoken');

const authUser = (req, res, next) => {
  try {
    const token = req.cookies?.token; // optional chaining avoids crash if cookies is undefined

    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Please log in" });
    }

    const decoded = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decoded; // should contain at least user id from payload
    console.log('✅ Verified user:', req.user);

    next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);
    return res.status(403).json({ message: "Forbidden: Please log in again" });
  }
};

module.exports = authUser;

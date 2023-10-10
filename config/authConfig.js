const jwt = require('jsonwebtoken')

function authenticateToken(req, res, next) {
  const bearerHeader = req.header('authorization');
  if (typeof bearerHeader !== 'undefined') {
    const token = bearerHeader.split(' ')[1];

    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({
          result: 'Token is invalid',
        });
      }
      req.decodedToken = decodedToken;
      next();
    });
  } else {
    res.status(401).json({
      result: 'Token is invalid',
    });
  }
}

module.exports = authenticateToken;

const authorize = (requiredRole) => {
    return (req, res, next) => {
      if (req.user && req.user.role === requiredRole) {
        next();
      } else {
        res.status(403).json({ message: 'Forbidden: Access is denied.' });
      }
    };
  };
  
  module.exports = authorize;
  
module.exports = (req, res, next) => {
    console.log(req);
    if (!req.user || req.user.credits < 1) {
      return res.status(403).send({ error: 'Not enough credits!' });
    }
  
    next();
  };
const AppError = require("../utils/AppError");
const { verify } = require("jsonwebtoken");
const authConfig = require("../configs/auth");

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.cookie;

  if(!authHeader) {
    throw new AppError("JWT token não informado", 401);
  }

  const [, token] = authHeader.split("token=");

  try {
    const {sub: user_id} = verify(token, authConfig.jwt.secret);
    request.user = {
      id: Number(user_id)
    }
    return next();
  } catch (error) {
    throw new AppError("JWT token inválido", 401);
  }

}

module.exports = ensureAuthenticated;
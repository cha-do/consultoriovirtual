const jwt = require("jsonwebtoken");

 function auth (req, res, next) {
  //leer el token del header
  console.log("verificando token en el requets")
  const token = req.header("x-auth-token");

  //revisar si no hay token

  if (!token) {
    return res.status(400).json({ msg: "No hay token, permiso no válido" });
  }

  //validar token

  try {
    const cifrado = jwt.verify(token,process.env.SECRETA);
    req.usuario=cifrado.usuario;
    console.log("Token en el requets verificado", req.usuario);
    next();

  } catch (error) {
    res.status(400).json({msg:"Token no válido"})
  }

};

module.exports = auth;
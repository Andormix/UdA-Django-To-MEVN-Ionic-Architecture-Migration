// Per fer el hashing de la contrasenya
const bcrypt = require("bcryptjs"); 
// Model Mongoose
const User = require("../models/User");
// JWT (Usuari no login després del registre)
const { signAccessToken } = require("../utils/jwt");

async function register(req, res, next) 
{
  try 
  {
    // Extracció vals
    const { username, email, password } = req.body;

    // Validació camps
    if (!username || !email || !password) 
    {
      return res.status(400).json({ message: "username, email and password are required" });
    }

    const passwordHash = await bcrypt.hash(password, 10); // De esto no me acoradaré EN CR, 10 es nivel complejidad
    const user = await User.create({ username, email, passwordHash }); // Insertem doc en MongoDB
    const token = signAccessToken(user);

    // Retornem Usuari.
    return res.status(201).json(
    {
      token,
      user: { id: user._id, username: user.username, email: user.email }
    });

  } catch (error) 
  {
    return next(error);
  }
}

// mem
async function login(req, res, next) 
{
  try 
  {
    const { username, password } = req.body;

    if (!username || !password) 
    {
      return res.status(400).json({ message: "Siusplau empleni tots els camps" });
    }

    const user = await User.findOne({ username });
    if (!user) 
    {
      return res.status(401).json({ message: "Usuari no existent" });
    }

    const isValidPassword = await bcrypt.compare(password, user.passwordHash);
    if (!isValidPassword) 
    {
      return res.status(401).json({ message: "Credencials incorrectes" });
    }

    const token = signAccessToken(user);

    return res.status(200).json({
      token,
      user: { id: user._id, username: user.username, email: user.email }
    }); // Ejemplo que le enviamos el token. En utils/jwt,js lo pusimos a 1h por seguridad.

  } catch (error) 
  {
    return next(error);
  }
}

function logout(req, res) 
{
  return res.status(200).json({ message: "Logout fet correctament" });
}

// comprovador d'estat de la sessió
function me(req, res) 
{
  return res.status(200).json({ user: req.user });
}

module.exports = { register, login, logout, me };

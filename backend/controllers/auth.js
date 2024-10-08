require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { jwtSecret } = process.env;
const { getUserFromToken } = require("../utils/getusersfromtoken");

let onlineUsers = new Set();

async function sameUsername(name) {
  try {
    const users = await User.find({});
    const usernames = users.map((user) => user.username);
    return usernames.includes(name);
  } catch (err) {
    console.error(err);
    return false;
  }
}

function isOlderThan13(dob) {
  const dateOfBirth = new Date(dob);
  const currentDate = new Date();
  const ageInMilliseconds = currentDate - dateOfBirth;
  const ageInYears = ageInMilliseconds / (1000 * 60 * 60 * 24 * 365.25);

  return ageInYears > 13;
}

async function checkRegistration(data) {
  let checked = "";

  if (data.password.length < 6) {
    checked += "Password less than 6 characters \n";
  }

  if (!isOlderThan13(data.userDob)) {
    checked += "User must be at least 13 years old to register. \n";
  }

  try {
    const isUserNameTaken = await sameUsername(data.username);
    if (isUserNameTaken) {
      checked += `Username '${data.username}' is taken. \n`;
    }
  } catch (error) {
    console.log(error);
  }
  return checked;
}

exports.register = async (req, res, next) => {
  const data = ({ username, password, userDob, userEmail } = req.body);
  let checked = await checkRegistration(data);
  if (checked === "") {
    bcrypt.hash(password, 10).then(async (hash) => {
      await User.create({
        username,
        password: hash,
        dob: userDob,
        email: userEmail,
      })
        .then((user) => {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          res.cookie("user", token, {
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully created",
            user: user._id,
          });
        })
        .catch((error) =>
          res.status(400).json({
            message: "User not successful created",
            error: error.message,
          })
        );
    });
  } else {
    return res.status(400).json({ message: checked });
  }
};

exports.login = async (req, res, next) => {
  const { username, password } = req.body;
  // Check if username and password is provided
  if (!username || !password) {
    return res.status(400).json({
      message: "Username or Password not present",
    });
  }
  try {
    const user = await User.findOne({ username });
    if (!user) {
      res.status(400).json({
        message: "Login not successful",
        error: "User not found",
      });
    } else {
      // comparing given password with hashed password
      bcrypt.compare(password, user.password).then(function (result) {
        if (result) {
          const maxAge = 3 * 60 * 60;
          const token = jwt.sign(
            { id: user._id, username, role: user.role },
            jwtSecret,
            {
              expiresIn: maxAge, // 3hrs in sec
            }
          );
          onlineUsers.add(user._id.toString());
          res.cookie("user", token, {
            maxAge: maxAge * 1000, // 3hrs in ms
          });
          res.status(201).json({
            message: "User successfully Logged in",
            user: user.username,
          });
        } else {
          res.status(400).json({ message: "Login not succesful" });
        }
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { role, id } = req.body;
  if (role && id) {
    if (role === "admin") {
      await User.findById(id)
        .then((user) => {
          if (user.role !== "admin") {
            user.role = role;
            try {
              const result = user
                .save()
                .then((result) =>
                  res
                    .status(201)
                    .json({ message: "User successfully upgraded", result })
                );
            } catch (err) {
              console.log(err);
            }
          } else {
            res.status(400).json({ message: "User is already an Admin" });
          }
        })
        .catch((error) => {
          res
            .status(400)
            .json({ message: "An error2 occurred", error: error.message });
        });
    } else {
      res.status(400).json({
        message: "Role is not admin",
      });
    }
  } else {
    res.status(400).json({ message: "Role or Id not present" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const { id } = req.body;
  await User.findById(id)
    .then((user) => user.deleteOne())
    .then((user) =>
      res.status(201).json({ message: "User successfully deleted", user })
    )
    .catch((error) =>
      res
        .status(400)
        .json({ message: "An error occurred", error: error.message })
    );
};

exports.getUsers = async (req, res, next) => {
  await User.find({})
    .then((users) => {
      const userResponse = users.map((user) => ({
        id: user._id,
        username: user.username,
        role: user.role,
        online: onlineUsers.has(user._id.toString()),
      }));
      res.status(200).json({ user: userResponse });
    })
    .catch((err) =>
      res.status(401).json({ message: "Not successful", error: err.message })
    );
};

exports.getUser = async (req, res, next) => {
  const token = req.headers.cookie.substring(5, req.headers.cookie.length);
  if (token) {
    const user = await getUserFromToken(token);
    const userResponse = {
      userId: user._id,
      username: user.username,
      gold: user.gold,
      experience: user.experience,
      role: user.role,

      pokemons: user.pokemons.map((pokemon) => ({
        uniqueId: pokemon.uniqueId,
        sprites: pokemon.sprites,
        name: pokemon.name,
        level: pokemon.level,
        hospital: pokemon.hospital,
        stats: [...pokemon.stats],
        types: pokemon.types,
        xp: pokemon.xp,
      })),
    };
    res.status(200).json(userResponse);
  }
};

exports.getPokemon = async (req, res, next) => {
  const token = req.headers.cookie.substring(5, req.headers.cookie.length);
  const id = req.params.id;
  if (token) {
    const user = await getUserFromToken(token);
    const pokemon = user.pokemons[id - 1];
    res.status(200).json(pokemon);
  }
};

exports.logout = async (req, res, next) => {
  const { userId } = req.body;
  onlineUsers.delete(userId);
  res
    .clearCookie("user")
    .status(200)
    .json({ message: "User successfully logged out" });
};

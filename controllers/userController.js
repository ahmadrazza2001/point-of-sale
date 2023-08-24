const User = require("../models/userModel.js");
const bcrypt = require("bcrypt");

const {
  isValidFirstName,
  isValidLastName,
  isValidEmail,
  isValidPassword,
} = require("../validator/signup.validator.js");

//for login
exports.loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ message: "This email does not exists in our system" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (isPasswordCorrect) {
      res.status(200).send(user);
    } else {
      res.status(401).json({ message: "Wrong email or password" });
    }
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

exports.signupController = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const errors = [];

    if (!isValidFirstName(firstName))
      errors.push({
        field: "firstName",
        message: "First Name must contain atleast 2 characters",
      });
    if (!isValidLastName(lastName))
      errors.push({
        field: "lastName",
        message: "Last Name must contain atleast 2 characters",
      });
    if (!isValidEmail(email))
      errors.push({
        field: "email",
        message: "Invalid email format",
      });

    if (!isValidPassword(password))
      errors.push({
        field: "password",
        message: "Password does not meet requirements",
      });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "Email is already registered. Please choose another email",
      });
    }

    const salt = await bcrypt.genSalt(12);
    const securePass = await bcrypt.hash(password, salt);

    user = await User.create({
      firstName,
      lastName,
      email,
      password: securePass,
    });

    res.json({ msg: "Successfully signed up!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

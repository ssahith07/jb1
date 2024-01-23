// module.exports = router;

const router = require("express").Router();
const { Seeker, Recruiter } = require("../models/user");
const bcrypt = require("bcrypt");
const Joi = require("joi");
const { connectToDatabase } = require('../database');
const jwt = require('jsonwebtoken');

// Validate function declaration
const validate = (data) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("Email"),
    password: Joi.string().required().label("Password"),
  });
  return schema.validate(data);
};

router.post("/", async (req, res) => {
  try {
    // Use the validate function
    const { recruitersCollection, seekersCollection } = await connectToDatabase();
    
    const { error } = validate(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const { email, password } = req.body;

    console.log("Searching for email:", email);

    const seekerData = await seekersCollection.findOne({ email });
    const recruiterData = await recruitersCollection.findOne({ email });
    // const role = seekerData.role || recruiterData.role;
   const role = recruiterData ? recruiterData.role : seekerData.role
    // console.log("Before finding email.")
    if (!seekerData && !recruiterData) {
      return res.status(401).send({ message: "Invalid Email or Password" });
    }
    // console.log("After finding email.")

    // Make sure that the retrieved seekerData is an instance of the Seeker model
    const seeker = seekerData ? new Seeker(seekerData) : null;
    const recruiter = recruiterData ? new Recruiter(recruiterData) : null;

    const validPassword = await bcrypt.compare(password, seeker ? seeker.password : recruiter.password);
    // console.log("Before Hashing Password.")

    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    // console.log("After Hashing Password.")

    // Use the specific method based on the role
    const token = seeker ? seeker.generateAuthToken() : recruiter.generateAuthToken();

    res.status(200).json({ token: token, role: role, message: "Logged in successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});


module.exports = router;
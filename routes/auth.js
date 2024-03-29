const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const User = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { email, password } = req.body;

        //check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: ' The user already exists'});
        }

        //Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        //Generate a two-step verification secret
        const twoStepSecret = speakeasy.generateSecret();

        //Create a new user
        const newUser = new User ({
            email,
            password: hashedPassword,
            twoStepSecret: twoStepSecret.base32
        });

        //Save the user to the database
        await newUser.save();
    }
});
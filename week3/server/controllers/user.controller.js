const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registration = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email, password to get registered.',
            })
        }
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(404).json({
                message: `A user with the email - '${email}' already exist, try registration with another email.`,
            })
        }

        const hpass = bcrypt.hashSync(password, 10);

        const newUser = new User({ email, password: hpass});
        await newUser.save()
        res.status(201).json({
            message: `Registration successful.`,
            newUser
        })
    }
    catch (err) {
        return res.status(500).json({ message: 'Internal server error', error: err.message })
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                message: 'Please provide email and password to login.',
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: 'No user found with the email.',
            })
        };

        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return res.status(404).json({
                message: "Please enter correct password.",
            })
        }

        const token = jwt.sign({ userId: user._id, role: user.role }, process.env.JWT_SECRET);

        res.status(200).json({
            message: "Login success",
            token,
            user
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal server error',
        })
    }
};
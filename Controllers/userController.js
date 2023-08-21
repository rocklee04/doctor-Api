const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Models/User');
const config = require('../config/config');

async function signup(req, res) {
    try {
        const {email, password} = req.body;

        const hashed = await bcrypt.hash(password, 10);

        const user = new User({email, password: hashed});
        await user.save();

        res.status(201).json({message: 'User registered Successfully'});
    } catch (err) {
        res.status(500).json({message: 'An error occurred'});
    }
}


async function login(req, res) {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if(!user) {
            return res.status(401).json({message: 'Invalid Credentials'});
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched) {
            return res.status(401).json({message: 'Invalid Credentials'}); 
        }

        const token = jwt.sign({id: user._id}, config.jwtSecret, {expiresIn: '2hr'});
        res.status(200).json({message: 'User Login Successfully', token});
    } catch (err) {
        res.status(500).json({message: 'An error occurred'});
    }
}

module.exports = {
    signup,
    login,
}
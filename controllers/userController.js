// const User = require('../models/userModel');

// const signUpUser = async (req, res) => {
//     const { username, email, password } = req.body;

//     try {
//         const newUser = new User({ username, email, password });
//         await newUser.save();
//         res.status(201).json({ message: 'User signed up successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Error signing up user' });
//     }
// };

// module.exports = { signUpUser };

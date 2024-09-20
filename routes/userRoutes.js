// const express = require('express');
// const { signUpUser } = require('../controllers/userController');
// const router = express.Router();

// router.post('/signup', signUpUser);

// module.exports = router;

const express = require('express');
const fs = require('fs');
const router = express.Router();

// Load existing users from the JSON file
function loadUsers() {
    try {
        const data = fs.readFileSync('users.json', 'utf8');
        return JSON.parse(data);
    } catch (err) {
        // Return an empty array if the file doesn't exist or is empty
        return [];
    }
}

// Save users to the JSON file
function saveUsers(users) {
    fs.writeFileSync('users.json', JSON.stringify(users, null, 2));
}

router.post('/signup', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: 'Please provide all required fields' });
    }

    // Load existing users
    const users = loadUsers();

    // Check if the user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
    }

    // Add new user
    const newUser = { username, email, password };
    users.push(newUser);

    // Save users to the JSON file
    saveUsers(users);

    res.status(201).json({ message: 'User signed up successfully' });
});

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5001;

// Middleware to parse JSON data
app.use(bodyParser.json());

// Path to the JSON file where data will be stored
const usersFilePath = path.join(__dirname, 'users.json');

// Helper function to read users from the file
const readUsersFromFile = () => {
    try {
        const data = fs.readFileSync(usersFilePath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return []; // Return an empty array if file doesn't exist or is corrupted
    }
};

// Helper function to write users to the file
const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2), 'utf-8');
};

// POST route to handle user sign-up
app.post('/api/users/signup', (req, res) => {
    const { username, email, password } = req.body;

    // Validate input
    if (!username || !email || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    // Read existing users
    const users = readUsersFromFile();

    // Check if the user already exists
    const userExists = users.some(user => user.email === email);
    if (userExists) {
        return res.status(400).json({ error: 'User with this email already exists.' });
    }

    // Create a new user object
    const newUser = { username, email, password };

    // Add the new user to the array and write to the file
    users.push(newUser);
    writeUsersToFile(users);

    // Respond with success message
    res.status(201).json({ message: 'Sign-up successful!', user: newUser });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

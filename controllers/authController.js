//import
const db = require('../config/db');
const bcrypt = require('bcryptjs');

//user registration function
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Please provide all required fields'
            });
        }

        // Check if user already exists
        const [rows] = await db.execute('SELECT email FROM users WHERE email = ?', [email]);
        console.log('Query result:', rows); // Log the result for debugging

        if (rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email already registered'
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user
        const [insertResult] = await db.execute(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
            [name, email, hashedPassword]
        );

        res.status(201).json({
            success: true,
            message: 'Registration successful',
            userId: insertResult.insertId
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({
            success: false,
            message: 'Error during registration',
            error: error.message
        });
    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        console.log('Login attempt for:', email); // Debug log

        // Check if user exists
        const result = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
        console.log('Query result:', result); // Log the result for debugging

        // Check the structure of the result
        if (!Array.isArray(result) || result.length === 0) {
            return res.status(500).json({
                success: false,
                message: 'Unexpected result from database'
            });
        }

        const users = result[0]; // Access the first element of the result

        if (users.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'User not found'
            });
        }

        const user = users[0];

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: 'Invalid password'
            });
        }

        // Successful login
        res.status(200).json({
            success: true,
            message: 'Login successful',
            userId: user.id,
            name: user.name,
            email: user.email
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during login',
            error: error.message
        });
    }
};

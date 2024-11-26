require('dotenv').config();
const express = require('express');
const path = require('path');
const db = require('./config/db');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to serve static files from the root directory
app.use(express.static(path.join(__dirname))); // Serve files from the root directory

// Serve the index.html file at the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html')); // Serve index.html as the landing page
});

// Use the authentication routes
app.use('/api/auth', authRoutes);

// Add the /api/talents endpoint
app.get('/api/talents', (req, res) => {
    // Logic to fetch talents from the database
    // For now, returning a mock response
    res.status(200).json([
        { id: 1, name: 'John Doe', title: 'Web Developer', description: 'Experienced in React and Node.js', hourlyRate: 50, skills: ['JavaScript', 'React', 'Node.js'] },
        { id: 2, name: 'Jane Smith', title: 'Graphic Designer', description: 'Specializes in UI/UX design', hourlyRate: 40, skills: ['Photoshop', 'Illustrator'] }
    ]);
});

// Add the /api/dashboard endpoint
app.get('/api/dashboard', (req, res) => {
    // Logic to fetch dashboard data
    // For now, returning a mock response
    res.status(200).json({
        activeJobs: 5,
        completedProjects: 10,
        totalEarnings: 1500
    });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Access the server at: http://localhost:${PORT}`);
});

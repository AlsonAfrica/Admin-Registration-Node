const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors'); // Add CORS

const app = express();
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from the specified origin
})); // Enable CORS for cross-origin requests
app.use(express.json()); // Use built-in middleware to parse JSON

// Initialize Firebase Admin SDK with the service account key
const serviceAccount = require('../Backend/node-registration-server-firebase-adminsdk-7yhna-df42b71885.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    // Uncomment and set if using Realtime Database
    // databaseURL: 'https://node-registration-server.firebaseio.com' 
});

const db = admin.firestore(); // Firestore reference

// Create (POST) - Add new user
app.post('/users', async (req, res) => {
    try {
        const { name, email, phoneNumber, position, image, idNumber } = req.body;

        // Validate request body
        if (!name || !email || !phoneNumber || !position || !idNumber) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const userRef = db.collection('users').doc(); // Generate unique ID

        await userRef.set({ name, email, phoneNumber, position, image, idNumber });
        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error('Error creating user:', error); // Detailed error logging
        res.status(500).json({ error: 'Error creating user', details: error.message });
    }
});

// Read (GET) - Get all users
app.get('/users', async (req, res) => {
    try {
        const usersSnapshot = await db.collection('users').get();
        const usersList = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json(usersList);
    } catch (error) {
        console.error('Error fetching users:', error); // Detailed error logging
        res.status(500).json({ error: 'Error fetching users', details: error.message });
    }
});

// Read (GET) - Get user by ID
app.get('/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const userDoc = await userRef.get();
        if (!userDoc.exists) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.status(200).json({ id: userDoc.id, ...userDoc.data() });
    } catch (error) {
        console.error('Error fetching user:', error); // Detailed error logging
        res.status(500).json({ error: 'Error fetching user', details: error.message });
    }
});

// Update (PUT) - Update user data
app.put('/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        const { name, email, phoneNumber, position, image, idNumber } = req.body;

        // Validate request body
        if (!name && !email && !phoneNumber && !position && !idNumber) {
            return res.status(400).json({ error: 'At least one field must be provided' });
        }

        const updateData = {};
        if (name) updateData.name = name;
        if (email) updateData.email = email;
        if (phoneNumber) updateData.phoneNumber = phoneNumber;
        if (position) updateData.position = position;
        if (image) updateData.image = image;
        if (idNumber) updateData.idNumber = idNumber;

        await userRef.update(updateData);
        res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
        console.error('Error updating user:', error); // Detailed error logging
        res.status(500).json({ error: 'Error updating user', details: error.message });
    }
});

// Delete (DELETE) - Remove a user
app.delete('/users/:id', async (req, res) => {
    try {
        const userRef = db.collection('users').doc(req.params.id);
        await userRef.delete();
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error); // Detailed error logging
        res.status(500).json({ error: 'Error deleting user', details: error.message });
    }
});

// Start the server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


import express from 'express';
import cors from 'cors';
import './database'; // Import to initialize the database connection pool
import authRoutes from './routes/auth';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors()); // Allows requests from your frontend
// FIX: Assign express.json() to a variable before passing to app.use to help with type inference, which was causing an overload resolution error.
const jsonParser = express.json();
app.use(jsonParser); // Parses incoming JSON requests

// Routes
app.use('/auth', authRoutes);
// You can add more routes here, for example:
// app.use('/api', anamnesesRoutes);

// Test Route
app.get('/', (req, res) => {
  res.send('FloralBot AI Backend is running!');
});

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    throw error;
  }
};

startServer();
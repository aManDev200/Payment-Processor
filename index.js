import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import config from './config.js';

// Import routers
import paymentRoutes from './routes/paymentRoutes.js';
import bankRoutes from './routes/cardRoutes.js';
import merchantRoutes from './routes/merchantRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 7000;
const { sequelize } = config;

// Middlewares
app.use(express.json());
app.use(cors());

// API Routes
app.use('/api/payment', paymentRoutes);  // Payment processing endpoints
app.use('/api/banks', bankRoutes);  // Bank registration and management
app.use('/api/merchants', merchantRoutes);  // Merchant registration and management

// Sync database and start the server
sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Payment processor API running on port ${PORT}`);
      console.log(`Swagger documentation available at http://localhost:${PORT}/api-docs`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error.message);
  });

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

export default app;

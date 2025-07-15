import dotenv from 'dotenv';
import { initServices } from './lib/config';

dotenv.config();

import app from './app';
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    await initServices();
    console.log('Services initialized successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
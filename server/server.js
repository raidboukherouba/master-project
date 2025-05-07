require("dotenv").config();
const app = require('./app');  // Import the app from app.js

const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || "development";

// Start the server
async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`🚀 Express server running in ${NODE_ENV} mode on port ${PORT}`);
    });
  } catch (error) {
    console.error("❌ cannot run the server:", error);
  }
}

startServer();
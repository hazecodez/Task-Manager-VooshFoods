const serverCreation = require("./config/app");
const connectDB = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const startServer = async () => {
  try {
    connectDB();
    const app = serverCreation();
    app?.listen(5000, () => console.log("Server running on port 5000"));
  } catch (error) {
    console.log("Server starting error:", error);
  }
};

startServer();

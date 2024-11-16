const serverCreation = require("./config/app");
const connectDatabase = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config({ path: path.resolve(__dirname, ".env") });

const startServer = async () => {
  try {
    connectDatabase();
    const app = serverCreation();
    app?.listen(5000, () => console.log("Server running on port 5000"));
  } catch (error) {
    console.log("Server starting error:", error);
  }
};

startServer();

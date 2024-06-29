const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = 5000;
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
const connectDB = require("./db");
const { adminAuth } = require("./middleware/auth");

//Connecting the Database
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", require("./auth/route"));

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

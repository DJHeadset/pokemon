const express = require("express");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const { initializeWebSocket } = require("./controllers/pvp");

const app = express();
const PORT = 5000;
const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);
initializeWebSocket(server);

//Connecting the Database
connectDB();

app.use(cookieParser());
app.use(express.json());
app.use("/api/auth", require("./routes/authRoute"));
app.use("/pokemon", require("./routes/pokeRoute"));

// Handling Error
process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

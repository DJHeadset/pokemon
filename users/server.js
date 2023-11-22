const express = require("express")
const cookieParser = require("cookie-parser");

const app = express()
const PORT = 5000
const server = app.listen(PORT, () =>
console.log(`Server Connected to port ${PORT}`)
)
const connectDB = require("./db");
const { adminAuth, userAuth } = require("./middleware/auth");


//Connecting the Database
connectDB();

app.use(express.json())
app.use("/api/auth", require("./auth/route"))
app.use(cookieParser());

app.get("/admin", adminAuth, (req, res) => res.send("Admin Route"))
app.get("/basic", userAuth, (req, res) => res.send("User Route"))

// Handling Error
process.on("unhandledRejection", err => {
  console.log(`An error occurred: ${err.message}`)
  server.close(() => process.exit(1))
})


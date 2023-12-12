const express = require("express");

const app = express();
const PORT = 5001;

app.use(express.json());
app.use("/pokemon", require("./route"));

const server = app.listen(PORT, () =>
  console.log(`Server Connected to port ${PORT}`)
);

process.on("unhandledRejection", (err) => {
  console.log(`An error occurred: ${err.message}`);
  server.close(() => process.exit(1));
});

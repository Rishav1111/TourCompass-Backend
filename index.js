const express = require("express");
const route = require("./routes/index.routes");
const connectDatabase = require("./Utils/connection"); // Import the connectDatabase function
const app = express();

app.use(express.json());

app.use("/api", route);
const PORT = process.env.PORT || 5000;

async function start() {
  try {
    await connectDatabase();
    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}...`);
    });
  } catch (error) {
    console.error(error);
  }
}

// Call the start function to start the server
start();

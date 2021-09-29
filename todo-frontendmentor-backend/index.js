const express = require("express");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const connectDB = require("./db");

const app = express();

// Route files
const todos = require("./routes/todos");

connectDB();

// Body parser
app.use(express.json());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// Prevent XSS attacks
app.use(xss());

// Enable CORS
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowsMs: 10 * 60 * 1000, // 10 mins
  max: 1000,
});

app.use(limiter);

// Mount routers
app.use("/api/v1/todos", todos);

// app.use(errorHandler);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  // Close server & exit process
  server.close(() => process.exit(1));
});

app.listen(5000, () => console.log("App is running on port 5000"));

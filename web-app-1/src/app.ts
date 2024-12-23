import express from 'express';
import session from 'express-session';
import bodyParser from 'body-parser';
import { setAuthRoutes } from './routes/authRoutes';
import { setDevoteeRoutes } from './routes/devoteeRoutes';
import { setAttendanceRoutes } from './routes/attendanceRoutes';
import { setReportRoutes } from './routes/reportRoutes';
import { connectToDatabase } from './utils/database'; // Assume a utility function for DB connection

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: true,
}));

// Set up routes
setAuthRoutes(app);
setDevoteeRoutes(app);
setAttendanceRoutes(app);
setReportRoutes(app);

// Connect to the database
connectToDatabase();

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
const express = require('express');
const connectDB = require('./config/db');
const stampRoutes = require('./routes/stamps');

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

app.use('/api/stamps', stampRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

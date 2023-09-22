const express = require('express');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false })); // this allows us to get the data inside request bodies

app.get('/', (req, res) => res.send('API Running'));

// Define Routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/admin', require('./routes/api/admin'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/pet', require('./routes/api/pet'));
app.use('/api/tasks', require('./routes/api/tasks'));

//look for an environment variable called PORT (needed later for deployment), if none exists default to 5000
const PORT = process.env.PORT || 5000; 

app.listen(PORT, ()=> console.log(`Server started on port ${PORT}`));
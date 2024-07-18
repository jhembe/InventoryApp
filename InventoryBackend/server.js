const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const itemRoutes = require('./routes/items');

// Use routes
app.use('/api/items', itemRoutes);
const User = require('./models/User');
const Item = require('./models/Item');
const Transaction = require('./models/Transaction');
const Barcode = require('./models/Barcode');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/inventory', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => {
  res.send('Inventory Management System');
});

// TODO: Define routes for CRUD operations

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authConfig = require('./config/authConfig.js');
const routes = require('./routes');

dotenv.config();

const app = express();

const corOptions = {
  origin: 'https://localhost:8081'
};

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

app.get('/', (req, res) => {
  res.json({ message: 'Hello from Test Project' });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

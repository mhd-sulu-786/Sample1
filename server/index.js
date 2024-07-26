require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { json, urlencoded } = require('express');
const cookieParser = require('cookie-parser');
const fromModel = require('./model/from');

const app = express();
const PORT = process.env.PORT || 6767;

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());

// MongoDB connection
const url = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/Sample1';
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully');
})
.catch((err) => {
  console.error('MongoDB connection error:', err.message);
});

app.get('/', (req, res) => {
  res.send('Server Running....');
});

app.post("/submit", (req, res) => {
  const { name, email,age} = req.body;
  const from = new fromModel({ name, email ,age });
  from.save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.get('/datas', (req, res) => {
  fromModel.find()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send(err);
    });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

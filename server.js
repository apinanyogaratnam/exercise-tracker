const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

app.use(cors());
app.use(express.static('public'));

mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

const personSchema = new mongoose.Schema({ username: String });
const exerciseSchema = new mongoose.Schema({ userId: String, description: String, duration: Number, date: Date });

const Person = mongoose.model('Person', personSchema);
const Exercise = mongoose.model('Exercise', exerciseSchema);

app.post("/api/users", function(req, res) {
  const newPerson = new Person({ username: req.body.username });
  newPerson.save(function(err, data) {
    if (err) res.json("Username already taken");
    else res.json({"username": data.username, "_id": data._id});
  });
});

app.post("/api/exercise/add", function(req, res) {
  const {userId, description, duration, date} = req.body;

  Person.findById(userId, function(err, data) {
    if (!data) res.send("Unknown userId");
    else {
      const username = data.username;
      const newExercise = new Exercise({ userId, description, duration, date });
      newExercise.save(function(err, data) {
        res.json({userId, username, description, duration, date});
      });
    }
  });
});

app.get("/api/exercise/log", function(req, res) {
  const {userId, from, to, limit} = req.query;
  Person.findById(userId, function(err, data) {
    if (!data) res.send("Unknown userId");
    else {
      const username = data.username;
      Exercise.find({userId, date: {$gte: from, $lte: to}}, function(err, data) {
        if (err) res.send("Error");
        else {
          if (limit) data = data.slice(0, limit);
          res.json({userId, username, from, to, limit, count: data.length, log: data});
        }
      });
    }
  });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

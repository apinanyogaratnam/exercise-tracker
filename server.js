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
    res.json({"username": data.username, "_id": data._id});
  });
});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

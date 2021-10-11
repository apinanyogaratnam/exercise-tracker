const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose');
require('dotenv').config()

app.use(cors())
app.use(express.static('public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html')
});

app.post("/api/users", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body parsing middleware
  var user = req.body;
  console.log(user);
  // We then add the user to the database
  db.User.create(user).then(function(dbUser) {
    // We have access to the new user document as dbUser
});



const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})

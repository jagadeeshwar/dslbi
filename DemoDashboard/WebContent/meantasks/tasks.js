const express = require('express');
const app = express();
// const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs')
app.use(express.static('public'))

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}))


var db

MongoClient.connect('mongodb://localhost/testtasks', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.get('/', (req, res) => {
  db.collection('tasks').find().toArray(function(err, results) {
  console.log(results)
  res.render('tasks.ejs', {tasktracker: results})
})
})



console.log('My Task Tracker')

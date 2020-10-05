const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const ObjectId=require('mongodb').ObjectId;
require('dotenv').config();
const port=5000;

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ol4yj.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/',(req, res) => {
  res.send("Welcome, Mohammad Tareq");
})

client.connect(err => {
    const typeCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION_WORK_TYPE);
    const volunteerCollection = client.db(process.env.DB_NAME).collection(process.env.DB_COLLECTION_VOLUNTEER);
    
    app.get('/volunteer-work-types',(req, res) => {
      typeCollection.find({})
      .toArray((err,documents)=>{
        res.send(documents)
      })})
      app.delete("/delete/:id", (req, res) => {
        volunteerCollection.deleteOne({_id:ObjectId(req.params.id)})
        .then(result => {
          if (result.deletedCount > 0) {
            res.send(result.deletedCount > 0)
          }
          else {
            res.status(404).send('Error 404');
          }
        })
     })
      app.post('/addVolunteer',(req, res) => {
        const registration =req.body;
        volunteerCollection.insertOne(registration)
        .then(result =>{
          if (result.insertedCount > 0) {
            res.send(result.insertedCount > 0)
          }
          else {
            res.status(404).send('Error 404');
          }
        })
      })
      app.post('/addEvent',(req, res) => {
        const event =req.body;
        typeCollection.insertOne(event)
        .then(result =>{
          if (result.insertedCount > 0) {
            res.send(result.insertedCount > 0)
          }
          else {
            res.status(404).send('Error 404');
          }
        })
      })
      app.get('/registerd/:email',(req, res) => {
        volunteerCollection.find({email:req.params.email})
        .toArray((err,documents)=>{
          res.send(documents)
        })})
        app.get('/registerd',(req, res) => {
          volunteerCollection.find({})
          .toArray((err,documents)=>{
            res.send(documents)
          })})
    
  });
app.listen(process.env.PORT || port);


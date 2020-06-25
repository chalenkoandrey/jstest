const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();
var bodyParser = require('body-parser')

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

function findUsers(start, limit) {
  return new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {
      if (err) {
        reject(err);
      }
      else {
        const db = client.db("UserDB")
        const collection = db.collection("users");
        collection.find().skip(start).limit(limit).toArray((err, res) => {
          err ? reject(err) : resolve(res);
        });
      }
    })
  })
}

function countUsers() {
  return new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {
      if (err) {
        return resolve(err);
      }
      else {
        const db = client.db("UserDB")
        const collection = db.collection("users");
        collection.find().count((err, res) => {
          err ? reject(err) : resolve(res)
        })
      }
    })
  })
}

router.route("/users/count")
  .get((req, res) => {
    countUsers()
      .then(rez => {
        res.status(200)
          .json({ "count": rez })
      })
      .catch(err => {

        res.status(500)
          .json(err)
      })
  })

router.route("/users/:skip/:limit")
  .get((req, res) => {
    if (req.params.limit != 0)
      findUsers(parseInt(req.params.skip), parseInt(req.params.limit))
        .then(rez => {
          res.status(200)
            .json(rez)
        })
        .catch(err => {
          console.log(err)
          res.status(500)
            .json(err)
        })
    else
      res.status(500)
        .json({ "error": "limit=0" })
  })

app.use(router)
app.listen(9000, () => {
  console.log("Server is running on port 9000");
});

module.exports = { app, findUsers, countUsers };

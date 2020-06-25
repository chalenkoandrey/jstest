const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();
var bodyParser = require('body-parser')

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

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

router.route("/users")
  .get((req, res) => {
    console.log(req.body.limit != 0)
    if (req.body.limit != 0)
      findUsers(req.body.skip, req.body.limit)
        .then(rez => {
          res.status(200)
            .json(rez)
        })
        .catch(err => {
          res.status(500)
            .json(err)
        })
    else
      res.status(500)
        .json({ "error": "limit=0" })

  })

function findUsers(start, limit) {
  return new Promise((resolve, reject) => {
    mongoClient.connect((err, client) => {
      if (err) {
        return reject(err);
      }
      else {
        const db = client.db("UserDB")
        const collection = db.collection("users");
        collection.find({}).toArray(function (err, result) {
          err ? reject(err) : resolve(result.splice(start, limit));
        })
      }
    });
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
        collection.find({}).toArray(function (err, result) {
          err ? reject(err) : resolve(result.length);
        })
      }
    });
  })
}

app.listen(9000, () => {
  console.log("Server is running on port 9000");
});
module.exports = { app, findUsers, countUsers };

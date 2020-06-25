const express = require("express");
const app = express();
const MongoClient = require("mongodb").MongoClient;
const router = express.Router();
var bodyParser = require('body-parser')
let dbClient;

const mongoClient = new MongoClient("mongodb://localhost:27017/", { useNewUrlParser: true });

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

function findUsers(start, limit) {
  const collection = app.locals.collection;
  return collection.find().skip(start).limit(limit).toArray()
}


function countUsers() {
  const collection = app.locals.collection;
  return collection.find().count()
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

app.use(router);
mongoClient.connect()
  .then(client => {
    dbClient = client;
    app.locals.collection = client.db("UserDB").collection("users");
    app.listen(9000, () => {
      console.log("Server is running on port 9000");
    });
  })
  .catch((err) => {
    console.log(err)
  })
process.on("SIGINT", () => {
  dbClient.close();
  process.exit();
});

module.exports = { app, findUsers, countUsers };

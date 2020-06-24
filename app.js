const express = require("express");
const fs = require("fs");
const fetch = require("node-fetch");
const app = express();


const string = "abc";
const url = "http://nodejs.org/dist/index.json";
const fileRead = "1.txt"
const type = "UTF-8"
const fileWrite = "rez.txt"


function readFile(fileName, type) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, type, (err, data) => {
      err ? reject(err) : resolve(data);
    });
  });
}

function writeToFile(fileName, data) {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, err => {
      err ? reject(err) : resolve();
    });
  })
}

function getDataByUrl(url) {
  return fetch(url)
    .then(response => response.json())
    .then(rez => JSON.stringify(rez))
}

function test(fileRead, type) {
  return Promise.all([readFile(fileRead, type), getDataByUrl(url)])
}

app.listen(9000, () => {
  test(fileRead, type)
    .then((rez) => {
      console.log(rez);
      return writeToFile(fileWrite, string + rez)
    })
    .then(() => {
      console.log("Data has been saved")
    })
    .catch(e => {
      console.log(e);
    })
  console.log("Server is running on port 9000");
});

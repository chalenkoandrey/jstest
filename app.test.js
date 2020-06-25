const findUsers = require('./app').findUsers;
const countUsers = require('./app').countUsers;
const { MongoClient } = require('mongodb');


beforeAll(async () => {
  connection = await MongoClient.connect("mongodb://localhost:27017/", {
    useNewUrlParser: true,
  });
  db = await connection.db("UserDB");
});

test('find users 5 ', async done => {
  const data = await findUsers(0, 5);
  expect(Object.values(data).length).toBe(5);
  done();
})

test('skip 1 get 2', async done => {
  const data = await findUsers(1, 2);
  expect(Object.values(data).length).toBe(2);
  done();
})

test('skip 1 get 1', async done => {
  const data = await findUsers(1, 1);
  expect(JSON.stringify(data[0]._id)).toMatch("5cee510cfda50d4b01b138f7")
  done();
})

test('count users', async done => {
  const data = await countUsers()
  expect(data).toBe(9)
  done();
})


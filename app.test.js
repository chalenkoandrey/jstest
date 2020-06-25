const app = require('./app');

test('find users 5 ', () => {
  return app.findUsers(0, 5).then(data => {
    expect(Object.values(data).length).toBe(5)
  })
})
test('skip 1 get 2', () => {
  return app.findUsers(1, 2).then(data => {
    expect(Object.values(data).length).toBe(2)
  })
})
test('skip 1 get 1', () => {
  return app.findUsers(1, 1).then(data => {
    expect(JSON.stringify(data[0]._id)).toMatch("5cee510cfda50d4b01b138f7")
  })
})
test('count users', () => {
  return app.countUsers().then(data => {
    expect(data).toBe(9)
  })
})

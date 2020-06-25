const app = require('./app');

test('find users 5 start from 2', () => {
  return app.findUsers(2, 5).then(data => {
    expect(Object.values(data).length).toBe(5)
  })
})
test('find without parameters', () => {
  return app.findUsers().then(data => {
    expect(Object.values(data).length).toBe(0)
  })
})
test('count users', () => {
  return app.countUsers().then(data => {
    expect(data).toBe(9)
  })
})

const request = require('supertest')
const server = require('../index')

describe('Get Endpoints', () => {
  it('Get', async (done) => {
    const res = await request(server)
      .get('/')
      .send({
        userId: 1,
        title: 'test is cool',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('nome');
    done();
  })
})

afterAll(async done => {
  // close server conection
  server.close();
  done();
});

const one = `<pre>
-----
|   |
| o |
|   |
-----
</pre>`;
const two = `<pre>
-----
|o  |
|   |
|  o|
-----
</pre>`;
const three = `<pre>
-----
|o  |
| o |
|  o|
-----
</pre>`;
const four = `<pre>
-----
|o o|
|   |
|o o|
-----
</pre>`;
const five = `<pre>
-----
|o o|
| o |
|o o|
-----
</pre>`;
const six = `<pre>
-----
|o o|
|o o|
|o o|
-----
</pre>`;
const sete = `<pre>
-----
|o o|
|o o|
|o o|
| o |
-----
</pre>`;
const oito = `<pre>
-----
|o o|
|o o|
|o o|
|o o|
-----
</pre>`;
const nove = `<pre>
-----
|o o|
|o o|
|o o|
|o o|
| o |
-----
</pre>`;
const dez = `<pre>
-----
|o o|
|o o|
|o o|
|o o|
|o o|
-----
</pre>`;
const vinte = `<pre>
-----
|o o|
|o o|
|o o|
|o o|
|o o|
-----
</pre>`;
const trinta = `<pre>
-----
|o o|
|o o|
|o o|
|o o|
|o o|
-----
</pre>`;
const cem = `<pre>
-----
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
|o o o o o o o o|
-----
</pre>`;

const diceNumbers = [one, two, three, four, five, six, sete, oito, nove, dez, vinte, trinta, cem];

module.exports = {
    roll: function () {
        return diceNumbers[Math.floor(Math.random()*diceNumbers.length)];
    }
};

const UserQueue = require('../queue/UserQueue');
const userQueue = new UserQueue({ test: true });
const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: process.env.NODE_ENV === "test" ? ".env.testing" : ".env" });

// Connects to database called avengers
beforeAll(async () => {
  const url = process.env.DB_HOST;
  console.log(url);
  await mongoose.connect(url, { useNewUrlParser: true });
});

test('Create user', async () => {
  let data = { name: "User Name", pass: "123456" }
  let res = await userQueue.createUser(data);
  res = { name: res.name, pass: res.pass };
  expect(res).toEqual(data);
});

test('Get all user', async () => {
  let res = await userQueue.getAllUser();
  expect(res.length).toBeGreaterThan(0);
});

// Disconnect Mongoose
afterAll(async () => {
  await User.deleteMany({}, () => console.log(''))
  await mongoose.connection.close()
});

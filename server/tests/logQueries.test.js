const buildDB = require('../database/config/build');
const connection = require('../database/config/connections');

const getUserByEmail = require('../database/queries/logQueries/getUserByEmail');
const insertUser = require('../database/queries/logQueries/insertUser');

beforeAll(() => buildDB());
afterAll(() => connection.end());

test('jest is working', () => {
    expect(1).toBe(1);
});

test('user already exists!', () => {
    getUserByEmail('ali5@gmail.com')
        .then(user => {
            expect(user.rows[0]).toMatchObject({ email: 'ali5@gmail.com' })
    })  
});

test('user doesnt exist!', () => {
    getUserByEmail('ali5@gmail')
        .then(user => {
            expect(user.rows[0]).toMatchObject({ email: 'ali5@gmail.com' })
        })
});

test('user inserted successfully!', () => {
    insertUser({ username: 'ali999', email: 'ali999@gmail.com', password: '999999'} )
        .then(user => {
            expect(user.rows[0]).toMatchObject({ email: 'ali999@gmail.com', password: '999999' })
        })
});
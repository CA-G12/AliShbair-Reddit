const supertest = require('supertest');
const buildDB = require('../database/config/build');
const router = require('../app');
const connection = require('../database/config/connections');

beforeAll(() => buildDB());
afterAll(() => connection.end());
describe('insert a username and email and password', () => {

    test('should respond with a 200 status code', (done) => {
        supertest(router)
            .post('/signup')
            .send({
                username: 'ali66',
                email: 'ali66@gmail.com',
                password: '123456',
                img: 'https://bit.ly/3TLJynb',
            })
            .expect(200)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) done(err);
                else {
                    expect(res.body.msg).toEqual('signup is working');
                    done();
                }
            });
    });

    test('should respond password invalid', (done) => {
        supertest(router)
            .post('/signup')
            .send({
                password: '123',
                email: 'ali5555@gmail.com',
                username: 'ali',
                img: 'https://bit.ly/3TLJynb',
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) done(err);
                else {
                    expect(res.body.msg).toEqual('"password" length must be at least 6 characters long');
                    done();
                }
            });
    });

    test('should respond email invalid', (done) => {
        supertest(router)
            .post('/signup')
            .send({
                password: '123456',
                email: 'ali.com',
                username: 'ali',
                img: 'https://bit.ly/3TLJynb',
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) done(err);
                else {
                    expect(res.body.msg).toEqual('"email" must be a valid email');
                    done();
                }
            });
    });

    test('should return email already exists', (done) => {
        supertest(router)
            .post('/signup')
            .send({
                password: 'dvdvdve',
                email: 'ali4@gmail.com',
                username: 'dvd',
                img: 'https://bit.ly/3TLJynb',
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) done(err);
                else {
                    expect(res.body.msg).toEqual('Email already exists');
                    done();
                }
            });
    });

    test('should respond username already exists', (done) => {
        supertest(router)
            .post('/signup')
            .send({
                password: '123456',
                email: 'ali444@gmail.com',
                username: 'ali4',
                img: 'https://bit.ly/3TLJynb',
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) done(err);
                else {
                    expect(res.body.msg).toEqual('Username already exists');
                    done();
                }
            });
    });

    test('should respond username length mush be at least 2 chars', (done) => {
        supertest(router)
            .post('/signup')
            .send({
                password: '123456',
                email: 'ali7@gmail.com',
                username: 'a',
                img: 'https://bit.ly/3TLJynb',
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) done(err);
                else {
                    expect(res.body.msg).toEqual('"username" length must be at least 2 characters long');
                    done();
                }
            });
    });

    test('should respond password is required', (done) => {
        supertest(router)
            .post('/signup')
            .send({
                email: 'ali9@gmail.com',
                username: 'ali9',
                img: 'https://bit.ly/3TLJynb',
            })
            .expect(400)
            .expect('Content-Type', /json/)
            .end((err, res) => {
                if (err) done(err);
                else {
                    expect(res.body.msg).toEqual('"password" is required');
                    done();
                }
            });
    });



}) // end describe
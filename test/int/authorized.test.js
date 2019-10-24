const setCookie = require('set-cookie-parser');

const { request } = require('./environment/supertest');

const userName = "bobdylan" + getRandomInt(1000);

describe("Authorized Integration Suite", () => {
    beforeAll(async (done) => {
        await request.post('/signup')
            .send({username: userName, password: 'passabcd12'})
            .expect('Content-Type', /json/)
            .expect(200);
        done();
    });

    afterAll(async () => {
        // delete `userName`
    });

    beforeEach(async (done) => {
        await request.post('/login')
            .send({username: userName, password: 'passabcd12'})
            .expect(200);
        done();
    });

    test('Me should return logged in user info', async () => {
        const response = await request.get('/me')
            .expect(200);

        expect(response.body).toEqual(
            {"likes": "1", "username": "johndoe1@gmail.com"}
        );
    });
});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
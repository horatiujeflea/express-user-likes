const setCookie = require('set-cookie-parser');

const { request } = require('./environment/supertest');


describe("Authorized Integration Suite", () => {
    const userName = "bobdylan" + getRandomInt(1000);
    let token;

    beforeAll(() => {
        console.log("regA");
        return new Promise(resolve => {
            const promise = request.post('/signup')
                .send({username: userName, password: 'passabcd12'})
                .expect('Content-Type', /json/)
                .expect(200);
            console.log("registered");
            resolve(promise);
        });
    });

    afterAll(() => {
        // delete `userName`
    });

    beforeEach(() => {
        console.log("logA");
        return new Promise(resolve => {
            const promise = request.post('/login')
                .send({username: userName, password: 'passabcd12'})
                .expect(200);
            console.log("login");
            resolve(promise);
        });
    });


    test('Me should return logged in user info', async () => {
        console.log("test");
        console.log("abc");
        const response = await request.get('/me');
        console.log(response.body);


        // const response = await request.get('/me')
        //     .expect(200);
        //
        // expect(response.body).toEqual(
        //     {"likes": "1", "username": "johndoe1@gmail.com"}
        // );
    });


});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
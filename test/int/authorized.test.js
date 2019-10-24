const { request } = require('./environment/supertest');

const userName = 'bobdylan' + getRandomInt(1000);
const password = 'passabcd12';


describe("Authorized Integration Suite", () => {

    beforeAll(async (done) => {
        const response = await request.post('/signup')
            .send({username: userName, password: password})
            .expect('Content-Type', /json/)
            .expect(200);
        done();
    });

    afterAll(() => {
        // delete `userName`
    });

    test('Me should return logged in user info', async () => {
        const cookieHeader = await login(userName, password);

        const response = await request
            .get('/me')
            .set('Cookie', cookieHeader);

        expect(response.body).toEqual(
            { username: userName }
        );
    });

    const login = async () => {
        const loginResp = await request.post('/login')
            .send({username: userName, password: password})
            .expect(200);

        return loginResp.header['set-cookie'];
    };

});

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}



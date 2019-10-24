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
        //todo delete `userName`
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

    test('Liking/Unliking a user should change his total likes', async () => {
        const cookieHeader = await login(userName, password);

        async function getCurrentLikes() {
            return parseInt(
                (await request
                    .get('/user/1')
                    .expect('Content-Type', /json/)
                    .expect(200))
                    .body.likes);
        }

        const initTotal = await getCurrentLikes();

        const likeResponse = await request
            .put('/user/1/like')
            .set('Cookie', cookieHeader)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(likeResponse.body.to).toEqual(1);
        expect(likeResponse.body.state).toEqual('successful');

        const afterLikeTotal = await getCurrentLikes();

        const unLikeResponse = await request
            .delete('/user/1/unlike')
            .set('Cookie', cookieHeader)
            .expect('Content-Type', /json/)
            .expect(200);

        expect(unLikeResponse.body.to).toEqual(1);
        expect(unLikeResponse.body.state).toEqual('successful');

        expect(afterLikeTotal).toEqual(initTotal + 1);

        const afterUnlikeTotal = await getCurrentLikes();
        expect(afterUnlikeTotal).toEqual(afterLikeTotal - 1);

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



const setCookie = require('set-cookie-parser');

const { request } = require('./environment/supertest');


describe("Public Integration Suite", () => {
    test('Signup should create a new user ', async () => {
        const response = await request.post('/signup')
            .send({username: 'willsmith', password: 'passabc1'})
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(
            {"status": "successful", "username": "willsmith"}
        );

        await request.post('/signup')
            .send({username: 'willsmith', password: 'passabc1'})
            .expect(400);
    });

    test('Login should be possible with the new user ', async () => {
        await request.post('/login')
            .send({username: 'willsmith', password: 'passabc12'})
            .expect(400);

        await request.post('/login')
            .send({username: 'willsmith1', password: 'passabc1'})
            .expect(400);

        const response = await request.post('/login')
            .send({username: 'willsmith', password: 'passabc1'})
            .expect('Content-Type', /json/)
            .expect(200);

        const cookies = setCookie.parse(response, {
            map: true
        });

        expect(cookies.token.value).toContain('ey');
        expect(cookies.token.value).toContain('.');
        expect(cookies.token.value.length).toBeGreaterThan(10);

        expect(response.body).toEqual(
            {"status": "successful", "username": "willsmith"}
        );
    });

    test('Me should fail', async () => {
        const response = await request.get('/me')
            .expect(401);
    });

    test('Update password should fail', async () => {
        const response = await request.put('/me/update-password')
            .send({password: 'passabc8'})
            .expect(401);
    });

    test('List user info should return username and total likes', async () => {
        let response = await request.get('/user/1')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(
            {"likes": "1", "username": "johndoe1@gmail.com"}
        );

        response = await request.get('/user/4')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual(
            {"likes": "3", "username": "johndoe4@gmail.com"}
        );
    });

    test('Like should fail', async () => {
        const response = await request.put('/user/2/like')
            .expect(401);
    });

    test('Unlike should fail', async () => {
        const response = await request.delete('/user/2/unlike')
            .expect(401);
    });

    test('Most likes should return data ', async () => {
        const response = await request.get('/most-liked')
            .expect('Content-Type', /json/)
            .expect(200);

        expect(response.body).toEqual([
            { user_id: 4, username: 'johndoe4@gmail.com', total: '3' },
            { user_id: 2, username: 'johndoe2@gmail.com', total: '2' },
            { user_id: 1, username: 'johndoe1@gmail.com', total: '1' }
        ]);
    });
});
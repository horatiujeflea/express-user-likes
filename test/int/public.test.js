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
        const response = await request.post('/login')
            .send({username: 'willsmith', password: 'passabc1'})
            .expect('Content-Type', /json/)
            .expect(200);

        console.log((response.headers['set-cookie'][0]));

        expect(response.body).toEqual(
            {"status": "successful", "username": "willsmith"}
        );

        await request.post('/login')
            .send({username: 'willsmith', password: 'passabc12'})
            .expect(400);

        await request.post('/login')
            .send({username: 'willsmith1', password: 'passabc1'})
            .expect(400);
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
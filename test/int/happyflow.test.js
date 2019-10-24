const { request } = require('./environment/setup');

describe("Public Integration Suite", () => {
    test('Integration Test ', async () => {
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
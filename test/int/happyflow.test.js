const { request } = require('./environment/setup');

test('E2E', async () => {
    const most = await request.get('/most-liked');
    console.log(most.body);

});
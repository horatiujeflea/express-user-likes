const packageJson = require('../../../package');
const { getStatus } = require('../../../app/service/status');

test('getStatus should return proper system status', () => {
    const statusObj = getStatus();

    expect(statusObj.status).toBe('up');
    expect(statusObj.version).toBe(packageJson.version);
});
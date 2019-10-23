const bcrypt = require('bcryptjs');

const { ValidationError } = require('../../../app/error/ValidationError');
const login = require('../../../app/service/login');


describe("Login Service Test", () => {
    beforeEach(() => {
        process.env.JWT_SECRET = 'secret_key123';
        process.env.JWT_EXPIRY_SECONDS = 86400;
    });

    test('Valid credentials should match and generate token', async () => {
        const password = 'pass123';
        const hashedPass = await _getHashFromPass(password);
        login._getUserDataQ = jest.fn(() => Promise.resolve([{"password": hashedPass}]));

        const result = await login.login('johndoe', password);
        expect(result).toContain('ey');
        expect(result).toContain('.');
        expect(result.length).toBeGreaterThan(10);

        expect(login._getUserDataQ).toHaveBeenCalledTimes(1);
    });

    test('Invalid password should not match', async () => {
        const password = 'pass123';
        const hashedPass = await _getHashFromPass(password);
        login._getUserDataQ = jest.fn(() => Promise.resolve([{"password": hashedPass}]));

        try {
            const result = await login.login('johndoe', 'Pass123');
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationError);
            expect(e.message).toBe("Credentials do not match");
        }
        expect(login._getUserDataQ).toHaveBeenCalledTimes(1);
    });

    test('Invalid user id should not match', async () => {
        login._getUserDataQ = jest.fn(() => Promise.resolve([]));

        try {
            const result = await login.login('johndoe', 'pass123');
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationError);
            expect(e.message).toBe("Credentials do not match");
        }
        expect(login._getUserDataQ).toHaveBeenCalledTimes(1);
    });

    async function _getHashFromPass(password) {
        return await bcrypt.hash(password, 10);
    }
});
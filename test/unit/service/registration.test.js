const { ValidationError } = require('../../../app/error/ValidationError');
const registration = require('../../../app/service/registration-service');

describe("Registration Service Test", () => {
    test('signUp should execute when all params are valid', async () => {
        registration._getInsertUserQ = jest.fn();

        const result = await registration.signUp('johndoe', 'pass123');
        expect(result).toEqual({
            "status": "successful",
            "username": "johndoe"
        });

        expect(registration._getInsertUserQ).toHaveBeenCalledTimes(1);
    });

    test('signUp should fail when user exists', async () => {
        registration._getInsertUserQ = jest.fn(() => {
            throw {constraint: 'app_user_username_key'}
        });

        try {
            const result = await registration.signUp('johndoe', 'pass123');
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationError);
            expect(e.message).toBe("Username is already taken");
        }

        expect(registration._getInsertUserQ).toHaveBeenCalledTimes(1);
    });


});
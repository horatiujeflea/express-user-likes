const container = require('../../../app/ioc/container');
container.userRepo = {};

const { ValidationError } = require('../../../app/error/ValidationError');


describe("Registration Service Test", () => {
    test('signUp should execute when all params are valid', async () => {
        container.userRepo.getInsertUserQ = jest.fn();

        const registration = require('../../../app/service/registration-service');

        const result = await registration.signUp('johndoe', 'pass123');
        expect(result).toEqual({
            "status": "successful",
            "username": "johndoe"
        });

        expect(container.userRepo.getInsertUserQ).toHaveBeenCalledTimes(1);
    });

    test('signUp should fail when user exists', async () => {
        container.userRepo.getInsertUserQ = jest.fn(() => {
            throw {constraint: 'app_user_username_key'}
        });

        const registration = require('../../../app/service/registration-service');

        try {
            const result = await registration.signUp('johndoe', 'pass123');
            expect(true).toBe(false);
        } catch (e) {
            expect(e).toBeInstanceOf(ValidationError);
            expect(e.message).toBe("Username is already taken");
        }

        expect(container.userRepo.getInsertUserQ).toHaveBeenCalledTimes(1);
    });
});
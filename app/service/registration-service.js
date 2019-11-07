const bcrypt = require('bcryptjs');
const saltRounds = 10;

const { ValidationError } = require('../error/ValidationError');

const container = require('../ioc/container');


const signUp = async (username, password) => {
    const userRepo = container.userRepo;

    if (!_validateUsername(username)) {
        throw new ValidationError('Username is not correct (specify requirements...)');
    }

    if (!_validatePassword(password)) {
        throw new ValidationError('Password is not correct (specify requirements...)');
    }

    const hash = await _getHashFromPass(password);

    try {
        const insertQ = container.userRepo.getInsertUserQ(username, hash);
        await insertQ;

        return {
            username,
            status: "successful"
        }
    } catch (e) {
        switch (e.constraint) {
            case 'app_user_username_key':
                throw new ValidationError('Username is already taken');
            default:
                throw new Error(e);
        }
    }
};

const changePassword = async (username, password) => {
    const userRepo = container.userRepo;

    if (!_validatePassword(password)) {
        throw new ValidationError('New password is not correct (specify requirements...)');
    }

    const hash = await _getHashFromPass(password);
    await userRepo.updatePassword(hash);
};

const _validateUsername = (username) => {
    // implement requirements
    return true;
};

const _validatePassword = (password) => {
    // implement requirements
    return true;
};

async function _getHashFromPass(password) {
    return await bcrypt.hash(password, saltRounds);
}

module.exports = {
    signUp,
    changePassword
};
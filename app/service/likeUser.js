let {ValidationError} = require('../error/ValidationError');

const likeUser = async (userId, knex) => {
    let loggedInUserId = 1;
    let toUserId = parseInt(userId);

    const successResp = {
        from: loggedInUserId,
        to: toUserId,
        state: "successful"
    };

    try {
        const insertQ = knex('user_like')
            .insert([{from_user: loggedInUserId, to_user: toUserId}]);
        await insertQ;

        return successResp;
    } catch (e) {
        switch (e.constraint) {
            case 'from_user_cannot_be_equal_to_to_user_chk':
                throw new ValidationError('You cannot like yourself');
            case 'user_like_to_user_fkey':
                throw new ValidationError('User id does not exist');
            case 'user_like_pkey':
                return successResp;
            default:
                throw new Error(e);
        }
    }
};

module.exports = {
    likeUser
};


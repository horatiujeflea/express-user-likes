const { ValidationError } = require('../error/ValidationError');

const container = require('../ioc/container');


const likeUser = async (loggedInUserId, userId) => {
    const likesRepo = container.likesRepo;

    const toUserId = parseInt(userId);

    const successResp = {
        from: loggedInUserId,
        to: toUserId,
        state: "successful"
    };

    try {
        const insertQ = likesRepo.getInsertQ(loggedInUserId, toUserId);
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


const container = require('../ioc/container');

const unlikeUser = async (loggedInUserId, userId) => {
    const likesRepo = container.likesRepo;

    const toUserId = parseInt(userId);

    const deleteQ = likesRepo.getDeleteQ(loggedInUserId, toUserId);
    await deleteQ;

    return {
        from: loggedInUserId,
        to: toUserId,
        state: "successful"
    };
};

module.exports = {
    unlikeUser
};


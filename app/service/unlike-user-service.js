const container = require('../ioc/container');
const likesRepo = container.likesRepo;

const unlikeUser = async (loggedInUserId, userId) => {
    let toUserId = parseInt(userId);

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


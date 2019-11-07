const { ValidationError } = require('../error/ValidationError');

const container = require('../ioc/container');


const getUserInfo = async (userId) => {
    const userRepo = container.userRepo;
    const likesRepo = container.likesRepo;

    const getLikesCountQ = likesRepo.getLikesCountQ(userId);
    const getUsernameQ = userRepo.getUsernameByIdQ(userId);

    const foundUsername = (await getUsernameQ)[0];
    if (!foundUsername) {
        throw new ValidationError("User does not exist");
    }

    const foundLikes = (await getLikesCountQ)[0];

    return {
        username: foundUsername.username,
        likes: foundLikes && foundLikes.total ? foundLikes.total : 0
    };
};

module.exports = {
    getUserInfo
};
const container = require('../ioc/container');

const getMostLiked = async () => {
    const userRepo = container.userRepo;
    return await userRepo.getMostLikedQ();
};

module.exports = {
    getMostLiked
};
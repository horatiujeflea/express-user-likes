const container = require('../ioc/container');
const userRepo = container.userRepo;

const getMostLiked = async () => {
    return await userRepo.getMostLikedQ();
};

module.exports = {
    getMostLiked
};
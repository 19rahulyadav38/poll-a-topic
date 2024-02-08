export const DynamicUrl =  'http://192.168.0.210:3000';

const voteCount = DynamicUrl + "/vote-count";
const voteTopic = DynamicUrl + "/vote-topic";
const createTopic = DynamicUrl + "/create-topic";
const castVote = DynamicUrl + "/cast-vote";


const apiUrls = {
    voteCount,
    voteTopic,
    createTopic,
    castVote
};

export default apiUrls;

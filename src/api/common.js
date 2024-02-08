import apiUrls from "./endPoint";
import axios from "axios";

export const _createTopic = (data) => {
    var value = {
        method: "POST",
        url: apiUrls.createTopic,
        data: data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    return axios(value)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};


export const _voteTopic = (data) => {
    var value = {
        method: "GET",
        url: apiUrls.voteTopic,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    return axios(value)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};



export const _castVote = (data) => {
    var value = {
        method: "POST",
        url: apiUrls.castVote,
        data: data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    return axios(value)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

export const _voteCount = (data) => {
    var value = {
        method: "GET",
        url: apiUrls.voteCount,
        params: data,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    };
    return axios(value)
        .then((response) => {
            return response;
        })
        .catch((error) => {
            console.log("Error: ", error);
        });
};

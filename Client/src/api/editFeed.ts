import customAxios from "../utility/axios";

interface useEditComment {
    feedId: number;
    body?: string;
}


export const editFeedData = async ({ feedId, body }: useEditComment) => {
    const response = await customAxios.patch(`/feed/${feedId}`, {
        body
    });
    return response.data
};

export const deleteFeedData = async ({ feedId }: useEditComment) => {
    const response = await customAxios.delete(`/feed/${feedId}`);
    return response.data
};
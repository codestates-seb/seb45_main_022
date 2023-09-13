import customAxios from "../utility/axios";

interface UseCommentProps {
    feedId: number;
    body: string;
}

interface useEditComment {
    commentId: number;
    body?: string;
}



export const addCommentData = async ({ feedId, body }: UseCommentProps) => {
    const response = await customAxios.post(`/comment/${feedId}`, {
        body
    });
    return response.data

};


export const editCommentData = async ({ commentId, body }: useEditComment) => {
    const response = await customAxios.patch(`/comment/${commentId}`, {
        body
    });
    return response.data
};

export const deleteCommentData = async ({ commentId }: useEditComment) => {
    const response = await customAxios.delete(`/comment/${commentId}`);
    return response.data
};
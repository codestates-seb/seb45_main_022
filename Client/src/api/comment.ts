import customAxios from "../utility/axios";

interface UseCommentProps {
    feedId: number;
    body: string;
}

export const addCommentData = async ({ feedId, body }: UseCommentProps) => {
    const response = await customAxios.post(`/comment/${feedId}`, {
        body
    });
    return response;

};

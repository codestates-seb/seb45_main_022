import axios from '../utils/axios';

export interface Comment {
  commentId: number;
  nickname: string;
  profileImage: string;
  level: number;
  body: string;
  createDate: string;
}
export interface CommentApiData {
  data: Comment[];
  pageInfo: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
  };
}

interface GetCommentParams {
  feedId: number;
  page: number;
}
export const getCommentData = async ({ feedId, page }: GetCommentParams) => {
  const response = await axios.get<CommentApiData>(
    `/comment/${feedId}?page=${page}&size=5`,
  );
  return response.data;
};

interface addCommentProps {
  feedId: number;
  body: string;
}
export const addCommentData = async ({ feedId, body }: addCommentProps) => {
  const response = await axios.post(`/comment/${feedId}`, {
    body,
  });
  return response.data;
};

interface ModifyCommentProps {
  commentId: number;
  body?: string;
}
export const editCommentData = async ({
  commentId,
  body,
}: ModifyCommentProps) => {
  const response = await axios.patch(`/comment/${commentId}`, {
    body,
  });
  return response.data;
};

export const deleteCommentData = async ({ commentId }: ModifyCommentProps) => {
  const response = await axios.delete(`/comment/${commentId}`);
  return response.data;
};

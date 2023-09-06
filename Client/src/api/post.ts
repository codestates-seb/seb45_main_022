import axios from "axios";


export interface PostData {
    id: number;
    profileImg: string;
    desc: string;
    likes: number;
}



export const getPostInfo = async (): Promise<PostData> => {
    const res = await axios.get('');
    return res.data;
};

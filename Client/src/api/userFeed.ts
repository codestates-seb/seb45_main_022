import customAxios from "../utility/axios"

export const getMyPosts = async () => {
    const response = await customAxios.get('/feed/my-post?page=1&size=10')
    // console.log()
    return response.data?.data
}
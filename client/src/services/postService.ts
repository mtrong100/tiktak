import axios from "axios";

type TPostData = {
  content: string;
  video: string;
};

export const createPost = async (data: TPostData, accessToken: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_ENDPOINT}/post/create`,
    data,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

export const getAllPosts = async () => {
  const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}/post/all`);

  return res.data;
};

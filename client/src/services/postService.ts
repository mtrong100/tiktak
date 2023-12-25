import { queryParams } from "@/constants/constants";
import { TCommentData } from "@/utils/types";
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

export const getAllPosts = async (
  page = queryParams.PAGE,
  limit = queryParams.LIMIT
) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_ENDPOINT
    }/post/all?page=${page}&limit=${limit}&sort=desc`
  );

  return res.data;
};

export const getUserPosts = async (
  id: string,
  accessToken: string,
  page = queryParams.PAGE,
  limit = queryParams.LIMIT
) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_ENDPOINT
    }/post/user/${id}?page=${page}&limit=${limit}&sort=desc`,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

export const getUserFollowingPosts = async (
  id: string,
  accessToken: string,
  page = queryParams.PAGE,
  limit = queryParams.LIMIT
) => {
  const res = await axios.get(
    `${
      import.meta.env.VITE_ENDPOINT
    }/post/following/${id}?page=${page}&limit=${limit}&sort=desc`,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

export const toggleLikePost = async (id: string, accessToken: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_ENDPOINT}/post/like/${id}`,
    {},
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

export const createComment = async (
  data: TCommentData,
  accessToken: string
) => {
  const res = await axios.post(
    `${import.meta.env.VITE_ENDPOINT}/comment/create`,
    data,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

export const getAllComments = async (id: string) => {
  const res = await axios.get(
    `${import.meta.env.VITE_ENDPOINT}/comment/post/${id}`
  );

  return res.data;
};

export const updateComment = async (
  id: string,
  data: string,
  accessToken: string
) => {
  const res = await axios.put(
    `${import.meta.env.VITE_ENDPOINT}/comment/update/${id}`,
    { content: data },
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

export const deleteComment = async (id: string, accessToken: string) => {
  const res = await axios.delete(
    `${import.meta.env.VITE_ENDPOINT}/comment/delete/${id}`,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

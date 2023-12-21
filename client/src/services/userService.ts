import { TCurrentUser, TUserUpdateData } from "@/utils/types";
import axios from "axios";

export const getUserDetail = async (
  accessToken: string | null,
  id: string | undefined
): Promise<TCurrentUser> => {
  const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}/user/${id}`, {
    headers: { token: `Bearer ${accessToken}` },
  });

  return res.data;
};

export const updateUser = async (
  accessToken: string | null,
  id: string | undefined,
  data: TUserUpdateData
) => {
  const res = await axios.put(
    `${import.meta.env.VITE_ENDPOINT}/user/update/${id}`,
    data,
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

export const getAllUsers = async () => {
  const res = await axios.get(`${import.meta.env.VITE_ENDPOINT}/user/all`);

  return res.data;
};

export const followUser = async (id: string, accessToken: string) => {
  const res = await axios.post(
    `${import.meta.env.VITE_ENDPOINT}/user/follow/${id}`,
    {},
    {
      headers: { token: `Bearer ${accessToken}` },
    }
  );

  return res.data;
};

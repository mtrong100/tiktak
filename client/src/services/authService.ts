import { TCurrentUser, TUserData } from "@/utils/types";
import axios from "axios";

export const oauthLogin = async (data: TUserData): Promise<TCurrentUser> => {
  const res = await axios.post(
    `${import.meta.env.VITE_ENDPOINT}/auth/login`,
    data
  );

  return res.data;
};

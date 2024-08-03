import { privateAxios } from "../privateAxiosInstance";

export const getMe = async () => {
  const { data } = await privateAxios.get("/users/me");
  return data;
};

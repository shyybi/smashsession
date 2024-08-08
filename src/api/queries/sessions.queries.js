import { privateAxios } from "../privateAxiosInstance";

export const getMySessions = async () => {
  const { data } = await privateAxios.get("/sessions/mine");
  return data;
};

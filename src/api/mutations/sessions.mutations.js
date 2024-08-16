import { privateAxios } from "../privateAxiosInstance";

export const createSession = async (session) => {
  const { data } = await privateAxios.post("/sessions", session);
  return data;
};

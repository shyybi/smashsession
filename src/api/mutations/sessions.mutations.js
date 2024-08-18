import { privateAxios } from "../privateAxiosInstance";

export const createSession = async (session) => {
  const { data } = await privateAxios.post("/sessions", session);
  return data;
};

export const deleteSession = async (sessionId) => {
  const { data } = await privateAxios.delete(`/sessions/${sessionId}`);
  return data;
};
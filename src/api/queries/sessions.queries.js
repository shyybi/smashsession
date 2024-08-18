import { privateAxios } from "../privateAxiosInstance";

export const getMySessions = async () => {
  const { data } = await privateAxios.get("/sessions/mine");
  return data;
};

export const getSessions = async (lat, lon) => {
  const { data } = await privateAxios.get("/sessions", {
    params: {
      lat,
      lon,
    },
  });
  return data;
};
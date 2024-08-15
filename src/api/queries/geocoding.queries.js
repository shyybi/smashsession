import { privateAxios } from "../privateAxiosInstance";

export const geocodeSearch = async (search) => {
  if (!search) {
    return Promise.resolve([]);
  }
  const { data } = await privateAxios.get(`/geocoding/search/${search}`);
  return data;
};

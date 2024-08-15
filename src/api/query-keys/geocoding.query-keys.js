export const geocodingQueryKeys = {
  all: ["geocoding"],
  search: (search) => [...geocodingQueryKeys.all, "search", search],
};

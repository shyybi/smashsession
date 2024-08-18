export const sessionsQueryKeys = {
  all: ["sessions"],
  details: () => [...sessionsQueryKeys.all, "details"],
  detail: (id) => [...sessionsQueryKeys.details(), id],
  lists: () => [...sessionsQueryKeys.all, "list"],
  list: (lat, lon) => [...sessionsQueryKeys.lists(), lat, lon],
  listMine: () => [...sessionsQueryKeys.lists(), "mine"],
};

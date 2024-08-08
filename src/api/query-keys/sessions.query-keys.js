export const sessionsQueryKeys = {
  all: ["sessions"],
  details: () => [...sessionsQueryKeys.all, "details"],
  detail: (id) => [...sessionsQueryKeys.details(), id],
  lists: () => [...sessionsQueryKeys.all, "list"],
  list: () => [...sessionsQueryKeys.lists()],
  listMine: () => [...sessionsQueryKeys.lists(), "mine"],
};

export const usersQueryKeys = {
  all: ["users"],
  me: () => [...usersQueryKeys.all, "me"],
  details: () => [...usersQueryKeys.all, "details"],
  detail: (id) => [...usersQueryKeys.details(), id],
  lists: () => [...usersQueryKeys.all, "list"],
  list: () => [...usersQueryKeys.lists()],
};

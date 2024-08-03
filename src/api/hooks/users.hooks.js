import { getMe } from "../queries/users.queries";
import { useQuery } from "@tanstack/react-query";
import { usersQueryKeys } from "../query-keys/users.query-keys";

export const useMe = () => {
  const { data: me, ...rest } = useQuery({
    queryKey: usersQueryKeys.me(),
    queryFn: getMe,
  });
  return { me, ...rest };
};

import { useQuery } from "@tanstack/react-query";
import { sessionsQueryKeys } from "../query-keys/sessions.query-keys";
import { getMySessions } from "../queries/sessions.queries";

export const useMySessions = () => {
  const { data: mySessions, ...rest } = useQuery({
    queryKey: sessionsQueryKeys.listMine(),
    queryFn: getMySessions,
  });
  return { mySessions, ...rest };
};

import { useQuery } from "@tanstack/react-query";
import { sessionsQueryKeys } from "../query-keys/sessions.query-keys";
import { getMySessions, getSessions } from "../queries/sessions.queries";

export const useMySessions = () => {
  const { data: mySessions, ...rest } = useQuery({
    queryKey: sessionsQueryKeys.listMine(),
    queryFn: getMySessions,
  });
  return { mySessions, ...rest };
};

export const useSessions = (lat, lon) => {
  const { data: sessions, ...rest } = useQuery({
    queryKey: sessionsQueryKeys.list(lat, lon),
    queryFn: () => getSessions(lat, lon),
  });
  return { sessions, ...rest };
};
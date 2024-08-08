import { Paper, Title } from "@mantine/core";
import { format } from "date-fns";

const SessionCard = ({ session }) => {
  return (
    <Paper p="md" radius="md" withBorder>
      <Title order={4}>{session.title}</Title>
      <p>{session.description}</p>
      <p>{session.address?.displayName ?? ""}</p>
      <p>{format(session.startAt, "dd/MM/yyyy HH:mm")}</p>
    </Paper>
  );
};

export default SessionCard;

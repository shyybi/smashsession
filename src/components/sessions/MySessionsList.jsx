import { Container, Skeleton, Stack } from "@mantine/core";
import { useMySessions } from "../../api/hooks/sessions.hooks";
import { useTheme } from "../../common/ThemeContext";
import MySessionCard from "./MySessionCard";

const MySessionsList = () => {
  const { mySessions, isLoading } = useMySessions();

  if (isLoading) {
    return (
      <Container mt="16px">
        <Stack>
          <Skeleton height={24} radius="xl" />
          <Skeleton height={24} radius="xl" />
          <Skeleton height={24} width="70%" radius="xl" />
        </Stack>
      </Container>
    );
  }

  return (
    <Container>
      <Stack mt="16px">
        {mySessions.map((session) => (
          <MySessionCard session={session} key={session.id} />
        ))}
      </Stack>
    </Container>
  );
};

export default MySessionsList;
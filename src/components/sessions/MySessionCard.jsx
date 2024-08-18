import { Flex, Loader, Paper, Stack, Title } from "@mantine/core";
import { IconTrash } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { deleteSession } from "../../api/mutations/sessions.mutations";
import { notifications } from "@mantine/notifications";
import { modals } from "@mantine/modals";
import { sessionsQueryKeys } from "../../api/query-keys/sessions.query-keys";

const SessionCard = ({ session }) => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: deleteSession,
    onSuccess: (data) => {
      queryClient.invalidateQueries(sessionsQueryKeys.listMine());
      notifications.show({
        title: "La session a bien été supprimée",
        message: `La session "${data.title}" a bien été supprimée !`,
        color: "green",
      });
    },
  });

  const openDeleteModal = () => {
    modals.openConfirmModal({
      title: "Supprimer la session",
      children: (
        <p>
          Vous allez supprimer la session <b>{session.title}</b>. Cette action
          est irréversible.
        </p>
      ),
      labels: { confirm: "Confirmer", cancel: "Annuler" },
      onConfirm: () => mutate(session.id),
      confirmProps: { color: "red" },
    });
  };

  return (
    <Paper p="md" radius="md" withBorder>
      <Flex align="center" justify="space-between">
        <Stack>
          <Title order={4}>{session.title}</Title>
          <p>{session.description}</p>
          <p>{session.address?.displayName ?? ""}</p>
          <p>{format(session.startAt, "dd/MM/yyyy HH:mm")}</p>
        </Stack>
        {isPending ? (
          <Loader color="red" size="xs" />
        ) : (
          <IconTrash
            style={{ flexShrink: 0 }}
            color="red"
            onClick={openDeleteModal}
            cursor="pointer"
          />
        )}
      </Flex>
    </Paper>
  );
};

export default SessionCard;

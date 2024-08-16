import { Button, Container, Flex, Stack, Title } from "@mantine/core";
import "../App.css";
import TextInputRhf from "../components/forms/TextInputRhf";
import { useForm } from "react-hook-form";
import TextareaRhf from "../components/forms/TextareaRhf";
import DateTimePickerRhf from "../components/forms/DateTimePickerRhf";
import { useNavigate } from "react-router-dom";
import AddressInputRhf from "../components/forms/AddressInputRhf";
import NumberInputRhf from "../components/forms/NumberInputRhf";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "../api/mutations/sessions.mutations";
import { notifications } from "@mantine/notifications";

function Create() {
  const { control, handleSubmit } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startAt: new Date(),
      address: null,
      seatsCount: 0,
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: createSession,
    onSuccess: (data) => {
      notifications.show({
        title: "Game is game",
        message: `La session "${data.title}" a bien été créée !`,
        color: "green",
      });
      navigate(-1);
    },
  });

  const onSubmitCreate = () => {
    handleSubmit((data) => {
      mutate({
        title: data.title,
        description: data.description,
        startAt: data.startAt,
        latLon: {
          lat: data.address?.lat,
          lon: data.address?.lon,
        },
        seatsCount: data.seatsCount,
      });
    })();
  };

  const navigate = useNavigate();

  return (
    <Container>
      <Stack align="stretch">
        <Title order={1} align="center">
          Créer une session
        </Title>
        <TextInputRhf
          control={control}
          name="title"
          label="Titre"
          placeholder="Titre de la session"
          required
        />
        <TextareaRhf
          control={control}
          name="description"
          label="Description"
          placeholder="Description de la session"
          autosize
          minRows={4}
          maxRows={10}
          required
        />
        <DateTimePickerRhf
          control={control}
          name="startAt"
          label="Date et heure de début"
          required
        />
        <AddressInputRhf
          control={control}
          name="address"
          label="Adresse"
          clearable
          required
        />
        <NumberInputRhf
          control={control}
          name="seatsCount"
          label="Capacité d'accueil"
          required
        />
        <Flex gap={24}>
          <Button flex={1} onClick={() => navigate(-1)} variant="outline">
            Annuler
          </Button>
          <Button
            flex={1}
            type="submit"
            onClick={onSubmitCreate}
            loading={isPending}
            disabled={isPending}
          >
            Créer une session
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}
export default Create;

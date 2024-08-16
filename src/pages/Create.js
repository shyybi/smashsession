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

const Create = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      startAt: new Date(),
      address: null,
      seatsCount: 1,
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
    onError: (error) => {
      notifications.show({
        title: "Une erreur s'est produite",
        message: error.response.data.message,
        color: "red",
      });
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
          rules={{ required: "Le titre est obligatoire" }}
          error={errors.title?.message}
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
          rules={{ required: "La description est obligatoire" }}
          error={errors.description?.message}
        />
        <DateTimePickerRhf
          control={control}
          name="startAt"
          label="Date et heure de début"
          required
          rules={{ required: "La date et l'heure de début sont obligatoires" }}
          error={errors.startAt?.message}
        />
        <AddressInputRhf
          control={control}
          name="address"
          label="Adresse"
          clearable
          required
          rules={{ required: "L'adresse est obligatoire" }}
          error={errors.address?.message}
        />
        <NumberInputRhf
          control={control}
          name="seatsCount"
          label="Capacité d'accueil"
          required
          min={1}
          rules={{
            required: "La capacité d'accueil est obligatoire",
          }}
          error={errors.seatsCount?.message}
        />
        <Flex gap="xs">
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
};

export default Create;

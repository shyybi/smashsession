import { Button, Container, Flex, Stack, Title } from "@mantine/core";
import "../App.css";
import TextInputRhf from "../components/forms/TextInputRhf";
import { useForm } from "react-hook-form";
import TextareaRhf from "../components/forms/TextareaRhf";
import DateTimePickerRhf from "../components/forms/DateTimePickerRhf";
import { useNavigate } from "react-router-dom";
import AddressInputRhf from "../components/forms/AddressInputRhf";
import NumberInputRhf from "../components/forms/NumberInputRhf";

function Create() {
  const { control } = useForm({
    defaultValues: {
      title: "Titre",
      description: "el",
      startAt: new Date(),
      address: null,
      seatsCount: 0,
    },
  });

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
        />
        <TextareaRhf
          control={control}
          name="description"
          label="Description"
          placeholder="Description de la session"
          autosize
          minRows={4}
          maxRows={10}
        />
        <DateTimePickerRhf
          control={control}
          name="startAt"
          label="Date et heure de début"
        />
        <AddressInputRhf control={control} name="address" label="Adresse" />
        <NumberInputRhf
          control={control}
          name="seatsCount"
          label="Capacité d'accueil"
        />
        <Flex gap={24}>
          <Button flex={1} onClick={() => navigate(-1)} variant="outline">
            Annuler
          </Button>
          <Button flex={1} type="submit" disabled>
            Créer une session
          </Button>
        </Flex>
      </Stack>
    </Container>
  );
}
export default Create;

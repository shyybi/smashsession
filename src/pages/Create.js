import { Button, Container, Flex, Stack, Title } from "@mantine/core";
import "../App.css";
import TextInputRhf from "../components/forms/TextInputRhf";
import { useForm } from "react-hook-form";
import TextareaRhf from "../components/forms/TextareaRhf";
import DateTimePickerRhf from "../components/forms/DateTimePickerRhf";
import { useNavigate, Link } from "react-router-dom";
import AddressInputRhf from "../components/forms/AddressInputRhf";
import NumberInputRhf from "../components/forms/NumberInputRhf";
import { useMutation } from "@tanstack/react-query";
import { createSession } from "../api/mutations/sessions.mutations";
import { notifications } from "@mantine/notifications";
import { useTheme } from "../common/ThemeContext";
import sun from "../Assets/sun.svg";
import moon from "../Assets/moon.svg";
import { useQueryClient } from "@tanstack/react-query";
import { usersQueryKeys } from "../api/query-keys/users.query-keys";
import { Loader } from "@mantine/core";
import axios from "axios";

const Create = ({ user, isLoadingUser }) => {
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
  const handleLogin = async () => {
    const response = await axios.get("http://localhost:5000/discord");
    window.location.href = response.data;
  };


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
  const { theme, toggleTheme } = useTheme();
  const themeIcon = theme === "light" ? sun : moon;
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const hasLocalStorageAccessToken = Boolean(
    localStorage.getItem("accessToken")
  );

  const Logout = () => {
    localStorage.removeItem("accessToken");
    queryClient.refetchQueries(usersQueryKeys.me());
    navigate("/");
    window.location.reload();
  };
  return (
    <>
      <header className="flex flex-row justify-between space-x-2 w-full   ">
        <div className="mt-5 mb-16 flex flex-row w-full">
          <div className="flex flex-row w-full justify-around ">
            <div className="flex">
              <Link to="/" className="text-xl items-center">SmashWith.Me</Link>
            </div>
            <div className="flex items-center">
              <Link to="/" className="text-lg">Accueil</Link>                
            </div>
          </div>
          {/* Icône de changement de thème */}
          <div className="flex w-72"><a></a></div>
          <div className="flex flex-row w-full justify-around">
            <div className="flex items-center">
              <button onClick={toggleTheme} className="flex items-center">
                <img src={themeIcon} alt="Theme icon" className="size-8" />
              </button>
            </div>
            <div className="flex flex-row items-center">
              {isLoadingUser && hasLocalStorageAccessToken ? (
                <Loader color="black" size="xs" />
              ) : user ? (
                <Link to="/profile">
                  <div
                    className="flex flex-row-reverse"
                    data-tooltip-id="avatar"
                    data-tooltip-content="Accedez à votre profil"
                  >
                    <img
                      src={`https://cdn.discordapp.com/avatars/${user.discordId}/${user.avatar}.png`}
                      alt="Discord Profile"
                      className="rounded-full w-10 h-10"
                    />
                    <span className="mt-2 mr-2">{user?.global_name}</span>
                  </div>
                </Link>
              ) : (
                <button
                  onClick={handleLogin}
                  className={`px-7 rounded-xl drop-shadow-lg mt-5 ml-20  h-11 ${
                    theme === "light"
                      ? "bg-gray-200 hover:bg-gray-300"
                      : "bg-[#848484] hover:bg-gray-600"
                  }`}
                >
                  Se Connecter
                </button>
              )}
            </div>
          </div>
        </div>
    </header>
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
    </>
  );
};

export default Create;

import { useEffect, useState } from "react";
import { useSessions } from "../../api/hooks/sessions.hooks";
import { notifications } from "@mantine/notifications";
import { Button, Flex, Grid, Loader, Paper, Text, Title } from "@mantine/core";
import { format } from "date-fns";
import google_maps from "../../Assets/google_map.svg";

const SessionsList = () => {
  function getPositionSuccess(pos) {
    var crd = pos.coords;
    setLatLon({ lat: crd.latitude, lon: crd.longitude });
  }

  function getPositionError(err) {
    console.warn(`ERROR(${err.code}): ${err.message}`);
  }

  const [latLon, setLatLon] = useState({
    lat: null,
    lon: null,
  });

  useEffect(() => {
    var options = {
      enableHighAccuracy: true,
      timeout: 5000,
      maximumAge: 0,
    };
    if (navigator.geolocation) {
      navigator.permissions
        .query({ name: "geolocation" })
        .then(function (result) {
          console.log(result);
          if (result.state === "granted") {
            //If granted then you can directly call your function here
            navigator.geolocation.getCurrentPosition(
              getPositionSuccess,
              getPositionError,
              options
            );
          } else if (result.state === "prompt") {
            //If prompt then the user will be asked to give permission
            navigator.geolocation.getCurrentPosition(
              getPositionSuccess,
              getPositionError,
              options
            );
          } else if (result.state === "denied") {
            //If denied then you have to show instructions to enable location
            notifications.show({
              title: "Accès à la position refusé",
              message:
                "Pour accéder aux sessions proches de chez vous, vous devez autoriser l'accès à votre position",
              color: "red",
            });
          }
        });
    } else {
      console.log("Geolocation is not supported by this browser.");
      notifications.show({
        title: "Accès à la position non supporté",
        message:
          "Pour accéder aux sessions proches de chez vous, votre navigateur doit supporter la géolocalisation",
        color: "red",
      });
    }
  }, []);

  const { sessions, isLoading } = useSessions(latLon.lat, latLon.lon);

  if (isLoading) {
    return <Loader color="red" size="xs" />;
  }

  if (sessions && sessions.length === 0) {
    return <Text>Aucune session à afficher</Text>;
  }

  return (
    <Grid>
      {sessions.map((session) => (
        <Grid.Col key={session.id} span={6}>
          <Paper p="md" radius="md" shadow="xs" bg="gray.1">
            <Title order={4} mb="md">
              {session.title}
            </Title>
            <Text>
              <Text component="span" fw={700}>
                Date et heure :{" "}
              </Text>
              {format(session.startAt, "eeee dd MMMM yyyy | HH:mm")}
            </Text>
            <Text>
              <Text component="span" fw={700}>
                Localisation :{" "}
              </Text>
              {session.address?.displayName ?? ""}
            </Text>
            <Text>
              <Text component="span" fw={700}>
                Participants :{" "}
              </Text>
              {session.participants?.length ?? 0} / {session.seatsCount}
            </Text>
            <Flex justify="space-between" align="center" mt="md">
              <Button
                variant="transparent"
                pl={0}
                pr={0}
                onClick={() => {
                  window.open(
                    `https://www.google.com/maps/search/?api=1&query=${session.address?.latitude},${session.address?.longitude}`,
                    "_blank"
                  );
                }}
              >
                <img className="w-6 h-6" src={google_maps} alt="Google Maps" />
                Ouvrir dans google maps
              </Button>
              <Button variant="outline" color="green" disabled>
                S'inscrire
              </Button>
            </Flex>
          </Paper>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default SessionsList;

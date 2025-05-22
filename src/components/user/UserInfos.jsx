import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useMe } from "../../api/hooks/users.hooks";
import { Alert, Skeleton } from "@mantine/core";

const UserInfos = () => {
  const [tooltipText, setTooltipText] = useState("Cliquez pour copier");
  const { me, isLoading } = useMe();

  const handleClick = () => {
    if (me?.id) {
      navigator.clipboard.writeText(me.id).then(() => {
        setTooltipText(`Identifiant "${me.id}" copié`);
        setTimeout(() => {
          setTooltipText("Cliquez pour copier le pseudo discord");
        }, 2000);
      });
    }
  };
  const usernameHandleClick = () => {
    if (me?.username) {
      window.open(`https://discord.com/users/${me.id}`, "_blank");
    }
  };


  if (isLoading) {
    return <Skeleton height={200} radius="md" />;
  }

  if (!me) {
    return <Alert> Vous n'êtes pas connecté </Alert>;
  }

  return (
    <div className="flex flex-row justify-center content-center w-auto">
      <div className="flex flex-col">
        <div className="flex text-center space-y-1 mt-2 flex-col">
          <button
            onClick={usernameHandleClick}
            style={{ cursor: "pointer", padding: "8px", borderRadius: "4px", background: "#4287f5", color: "#fff", border: "none", margin: "8px 0" }}
          >
            Ajouter sur Discord
          </button>
          <p>Participation en Session : </p>
        </div>
        <div className="mt-10">
            <p>Les Notes de la communauté seront ajoutées dans le futur !</p>
            <div id="Stars">{/* Placeholder pour les notes stars */}</div>
          </div>
      </div>
    </div>
  );
};

export default UserInfos;

import { useState } from "react";
import { Tooltip } from "react-tooltip";
import { useMe } from "../../api/hooks/users.hooks";
import { Alert, Skeleton } from "@mantine/core";

const UserInfos = () => {
  const [tooltipText, setTooltipText] = useState("Cliquez pour copier");
  const handleClick = () => {
    navigator.clipboard.writeText(me.username).then(() => {
      setTooltipText(`Identifiant "${me.username}" copié`);
      setTimeout(() => {
        setTooltipText("Cliquez pour copier le pseudo discord");
      }, 2000);
    });
  };

  const { me, isLoading } = useMe();

  if (isLoading) {
    return <Skeleton height={200} radius="md" />;
  }

  if (!me) {
    return <Alert> Vous n'êtes pas connecté </Alert>;
  }

  return (
    <div className="flex flex-row justify-center content-center w-auto">
      <div className="flex flex-col">
        <div className="text-center space-y-1 mt-2">
          <p>Pseudo : {me?.global_name}</p>
          <span
            onClick={handleClick}
            style={{ cursor: "pointer", display: "inline-block" }}
            data-tooltip-id="discordId"
            data-tooltip-content={tooltipText}
          >
            Discord Id : {me?.discordId}
          </span>
          <Tooltip id="discordId" place="bottom" />
          <p>Sessions Organisées : </p>
          <p>Participation en Session : </p>
          <div>
            <p>Les Notes de la communauté seront ajoutées dans le futur !</p>
            <div id="Stars">{/* Placeholder pour les notes stars */}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfos;

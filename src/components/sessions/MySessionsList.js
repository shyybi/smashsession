import React from "react";
import { useMySessions } from "../../api/hooks/sessions.hooks";

function MySessionsList() {
  const { data: mySessions, isLoading, isError, error } = useMySessions();

  if (isLoading) {
    return <div>Chargement...</div>;
  }

  if (isError) {
    return <div>Erreur lors du chargement des sessions : {error?.message || "Erreur inconnue"}</div>;
  }

  if (!mySessions || mySessions.length === 0) {
    return <div>Aucune session trouvée</div>;
  }

  return (
    <div>
      {mySessions.map((session) => (
        <div key={session.id}>
          {/* Render session details here */}
          <h3>{session.title}</h3>
          <p>{session.description}</p>
        </div>
      ))}
    </div>
  );
}

export default MySessionsList;
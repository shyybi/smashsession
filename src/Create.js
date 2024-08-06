import "./App.css";

function Create () {
  return (
    <div className="flex flex-col">
      <header>
        <p>NaetorUSmash</p>
        {/*
        <div>
          <img 
            src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`}
            alt="Discord Profile"
            className="flex justify-center rounded-full size-72 border-2 border-black"
          />
          <p>{user.global_name}</p>
        </div>
        */}
      </header>
      <div className="flex flex-row w-full justify-center">
        <div className="flex flex-row w-full justify-center">
          <div className="flex justify-start w-auto">
            <button>Annuler</button>
          </div>
          <div className="flex justify-center w-auto">
            <p>Créer une session</p>
          </div>
          <div>
            <p>Titre :</p>
            <input type="text" placeholder="aa"></input>
          </div>
          <div>
            <p>Description :</p>
            <textarea placeholder="aa"></textarea>
          </div>
          
        </div>
      </div>
    </div>
  );
}
export default Create;
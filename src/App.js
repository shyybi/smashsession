import React from 'react';
import './App.css';
import './Assets/moon.png' 
const moon = require('./Assets/moon.png')
function App() {
  return (
    // ne pas utiliser <a></a> pour les paragraphes.

    <div>
      <header id='App-Header' className='flex flex-row justify-around mt-3 '>
        <p className='text-lg mt-2'>SessionSmash</p>
        <input type='text' placeholder='Recherche par joueurs / régions'  className='bg-gray-300 text-black w-7/12 h-10 rounded-xl pl-2'/>

        <div className='flex flex-row space-x-44 '>
          <img src={moon} alt='moon' className='size-8'/>
          <button className='bg-gray-300 px-7 rounded-xl drop-shadow-lg'>Se Connecter</button>
        </div>
      </header>
      {/* La partie ou y a les filtres a gauche et les sessions a droite */}
      <div class="m-8 w-1/6" >  
        <div>
          <p>Filtres de recherche</p>
          <br />
          <div class="flex flex-col gap-8"> 
            <div>
              <p>Jeu</p>
              <select name='jeu' class="bg-gray-200 rounded-lg p-3 w-full ">
                <option value='ultimate'>Smash Ultimate</option>
                <option value='hdr'>Smash HDR</option>
                <option value='hdr'>Sm4sh</option>
                <option value='brawl'>Smash Brawl</option>
                <option value='melee'>Smash Melee</option>

              </select>
            </div>
            <div>
              <p>Distance</p>
              <div>
                <input type='range'></input>
                <div className='flex flex-row '>
                  <p>0 km</p>
                  <p>100 km</p>
                </div>
              </div>
            </div>
            <div>
              <p>Afficher les sessions pleines</p>
              <input type='checkbox'></input>
            </div>
            <div>
              <p>Horaire</p>
              <input type='datetime-local' class="bg-gray-200 rounded-lg p-3 w-full "></input>
            </div>
            <div>
              <p>Niveau</p>
              <select name='niveau' class="bg-gray-200 rounded-lg p-3 w-full ">
                <option value='debutant'>Débutant</option>
                <option value='intermediaire'>Intermédiaire</option>
                <option value='expert'>Expert</option>
              </select>
            </div>
          </div>
        </div>
        <br />
        {/* Petit espace pour pas se perdre */}
        <div>
          <p>Sessions proche</p>
        </div>
      </div>
    </div>
  );
}

export default App;

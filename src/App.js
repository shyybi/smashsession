import React from 'react';
import './App.css';
import './Assets/moon.png' 
const moon = require('./Assets/moon.png')
const searchico = require('./Assets/search-interface-symbol.png')
function App() {
  return (
    // ne pas utiliser <a></a> pour les paragraphes.

    <div>
      <header id='App-Header' className='flex flex-row justify-around mt-3 '>
        <p className='text-lg mt-2'>SessionSmash</p>
        <div className='flex flex-row w-7/12 bg-gray-300 rounded-xl pl-2'>
          <button className='size-8 mt-1 pr-3'>
            <img src={searchico} alt='moon' />
          </button>
          <input type='text' placeholder='Recherche par joueurs / régions'  className='bg-gray-300 text-black rounded-xl h-10 w-full  pl-2 '/>
        </div>
        
        <div className='flex flex-row space-x-44 '>
          <img src={moon} alt='moon' className='size-8'/>
          <button className='bg-gray-300 px-7 rounded-xl drop-shadow-lg'>Se Connecter</button>
        </div>
      </header>
      {/* La partie ou y a les filtres a gauche et les sessions a droite */}
      <div>  
        <div>
          <p>Filtres de recherche</p>
          <div>
            <p>Jeu</p>
            <select name='jeu'>
              <option value='ultimate'>Smash Ultimate</option>
              <option value='hdr'>Smash HDR</option>
              <option value='hdr'>Sm4sh</option>
              <option value='brawl'>Smash Brawl</option>
              <option value='melee'>Smash Melee</option>
            </select>
            <p>Distance</p>
            <div>
              <input type='range'></input>
              <div className='flex flex-row '>
                <p>0 km</p>
                <p>100 km</p>
              </div>
            </div>
            <div className='flex flex-row space-x-4'>
              <p>Afficher les sessions pleines</p>
              <input type='checkbox'></input>
            </div>
            
            <p>Horaire</p>
            <input type='datetime-local'></input>
            <p>Niveau</p>
            <select name='niveau'>
              <option value='debutant'>Débutant</option>
              <option value='intermediaire'>Intermédiaire</option>
              <option value='expert'>Expert</option>
            </select>
          </div>
        </div>
        {/* Petit espace pour pas se perdre */}
        <div>
          <p>Sessions proche</p>
        </div>
      </div>
    </div>
  );
}

export default App;
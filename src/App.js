import React from 'react';
import './App.css';
import './Assets/moon.png' 
const moon = require('./Assets/moon.png')
function App() {
  return (
    <div>
      <header id='App-Header' className='flex flex-row justify-around mt-3 '>
        <p className='text-lg mt-2'>SessionSmash</p>
        <input type='text' placeholder='Recherche par joueurs / régions'  className='bg-gray-300 text-black w-7/12 h-10 rounded-xl pl-2'/>

        <div className='flex flex-row space-x-44 '>
          <img src={moon} alt='moon' className='size-8'/>
          <button className='bg-gray-300 px-7 rounded-xl drop-shadow-lg'>Se Connecter</button>
        </div>
      </header>
    </div>
  );
}

export default App;

import React, { useState } from 'react';
import Tooltip from 'react-tooltip-lite';
import { Link } from 'react-router-dom'; 
const moon = require('./Assets/moon.png');

function Profile({ user }) {
  const [tooltipText, setTooltipText] = useState('Cliquez pour copier');

  const handleClick = () => {
    navigator.clipboard.writeText(user.username).then(() => {
      setTooltipText(`Identifiant "${user.username}" copié`);
      setTimeout(() => {
        setTooltipText('Cliquez pour copier le pseudo discord'); 
      }, 2000); 
    });
  };

  return (
    <div>
      <header className='flex flex-row space-x-2'>
        <p>Title</p>
        <div>
          <Link to="/">Accueil</Link>
        </div>
        
        <img src={moon} alt='moon' className='size-8' />
      </header>
      {user && (
        <div className='flex flex-row justify-center content-center'>
          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt='Discord Profile' className='flex justify-center rounded-full w-11/12 h-11/12 border-2 border-black' />
            </div>
            <div className='text-center space-y-1 mt-2'>
              <p>Pseudo : {user.global_name}</p>
              <Tooltip content={tooltipText} direction="left" tagName="span" className="tooltip ">
                <span
                  onClick={handleClick}
                  style={{ cursor: 'pointer', display: 'inline-block' }}
                >
                  Discord Id : {user.id}
                </span>
              </Tooltip>
              <p>Sessions Organisées : </p>
              <p>Participation en Session : </p>
              <div>
                <p>Note de la communauté</p>
                <div id="Stars">
                  {/* Placeholder pour les notes stars */}
                </div>
              </div> 
            </div> 
          </div> 
        </div> 
      )} 
    </div>
  );
}

export default Profile;
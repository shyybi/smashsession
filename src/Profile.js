import React, { useState } from 'react';
import Tooltip from 'react-tooltip-lite';
import { Link, useNavigate } from 'react-router-dom'; 


const moon = require('./Assets/moon.png');

function Profile({ user }) {
  const [tooltipText, setTooltipText] = useState('Cliquez pour copier');
  const navigate = useNavigate();

  const handleClick = () => {
    navigator.clipboard.writeText(user.username).then(() => {
      setTooltipText(`Identifiant "${user.username}" copié`);
      setTimeout(() => {
        setTooltipText('Cliquez pour copier le pseudo discord'); 
      }, 2000); 
    });
  };

  const Logout = () => {
    localStorage.removeItem('user');
    navigate('/');
    window.location.reload();
  }

  return (
    <div>
      <header className='flex flex-row justify-evenly space-x-2 '>
        <p>NaetorUSmash</p>
        <div>
          <Link to="/">Accueil</Link>
        </div>
        <img src={moon} alt='moon' className='size-8' />
        <button onClick={Logout}>se deconnecter</button>
      </header>
      {user && (
        <div className='flex flex-row justify-center content-center w-auto'>
          <div className='flex flex-col'>
            <div className='flex justify-center'>
              <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt='Discord Profile' className='flex justify-center rounded-full  size-72 border-2 border-black' />
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
                <p>Les Note de la communauté seront ajouter dans le futur !  </p>
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
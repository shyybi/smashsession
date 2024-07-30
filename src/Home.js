import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ajout de useNavigate pour la redirection

import './App.css';
import './Assets/moon.png';
const moon = require('./Assets/moon.png');
const searchico = require('./Assets/search-interface-symbol.png');

function Home() {
    const [user, setUser] = useState(null);
    const [distance, setDistance] = useState(50);
    const navigate = useNavigate(); // Initialisation de useNavigate

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        if (code) {
            fetch(`http://localhost:5000/oauth/callback?code=${code}`)
                .then(response => response.json())
                .then(data => {
                    setUser(data);
                    navigate('/'); // Redirection vers la page d'accueil
                });
        }
    }, [navigate]);

    const handleLogin = () => {
        window.location.href = 'http://localhost:5000/oauth/discord';
    };

    const handleDistanceChange = (event) => {
        setDistance(event.target.value);
    };

    return (
        <div>
            <header id='App-Header' className='flex flex-row justify-around mt-3 '>
                <p className='text-lg mt-2'>SessionSmash</p>
                <div className='flex flex-row w-7/12 bg-gray-300 rounded-xl pl-2'>
                    <button type='submit' className='size-8 mt-1 pr-3'>
                        <img src={searchico} alt='moon' />
                    </button>
                    <input type='text' placeholder='Recherche par joueurs / régions' className='bg-gray-300 text-black rounded-xl h-10 w-full pl-2 ' />
                </div>
                <div className='flex flex-row space-x-44 '>
                    <img src={moon} alt='moon' className='size-8' />
                    {user ? (
                        <Link to="/profile">
                            <div className='flex flex-row-reverse '>
                                <img src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png`} alt='Discord Profile' className='rounded-full w-10 h-10' />
                                <span className='mt-2 mr-2'>{user.global_name}</span>
                            </div>
                        </Link>
                    ) : (
                        <button onClick={handleLogin} className='bg-gray-200 px-7 rounded-xl drop-shadow-lg'>
                            Se Connecter
                        </button>
                    )}
                </div>
            </header>
            <div className="m-8 w-1/6">
                <div>
                    <p>Filtres de recherche</p>
                    <br />
                    <div className="flex flex-col gap-8">
                        <div>
                            <p>Jeu</p>
                            <select name='jeu' className="bg-gray-200 rounded-lg p-3 w-full ">
                                <option value='ultimate'>Smash Ultimate</option>
                                <option value='hdr'>Smash HDR</option>
                                <option value='sm4sh'>Sm4sh</option>
                                <option value='brawl'>Smash Brawl</option>
                                <option value='melee'>Smash Melee</option>
                            </select>
                        </div>
                        <div>
                            <div className='flex flex-row space-x-1'>
                                <p>Distance : </p>
                                <output>{distance} km</output>
                            </div>
                            <div>
                                <input
                                    type='range'
                                    min="0"
                                    max="100"
                                    value={distance}
                                    onChange={handleDistanceChange}
                                    className='w-full'
                                />
                                <div className='flex flex-row justify-between'>
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
                            <input type='datetime-local' className="bg-gray-200 rounded-lg p-3 w-full "></input>
                        </div>
                        <div>
                            <p>Niveau</p>
                            <select name='niveau' className="bg-gray-200 rounded-lg p-3 w-full ">
                                <option value='debutant'>Débutant</option>
                                <option value='intermediaire'>Intermédiaire</option>
                                <option value='expert'>Expert</option>
                            </select>
                        </div>
                    </div>
                </div>
                <br />
                <div>
                    <p>Sessions proche</p>
                </div>
            </div>
        </div>
    );
}

export default Home;
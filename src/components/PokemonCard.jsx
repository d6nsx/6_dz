import React from 'react';
import '../App.css';

const PokemonCard = ({ pockemon, onCardClick }) => {
    return (
        <div>
            <h1>Pokemon</h1>
            <div className='pokemon'>
                {pockemon.map((item, index) => (
                    <div className='card' key={index} onClick={() => onCardClick(item)}>
                        <img src={item.sprites.other.dream_world.front_default} alt={item.name} />
                        <span>{item.name}</span>
                        <button>Подробнее</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PokemonCard;

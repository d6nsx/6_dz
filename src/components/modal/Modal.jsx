import React from 'react';
import './Modal.css';

const Modal = ({ pokemon, onClose }) => {
    if (!pokemon) return null;

    return (
        <div className='modal-overlay'>
            <div className='modal-content'>
                <h2>{pokemon.name}</h2>
                <img src={pokemon.sprites.other.dream_world.front_default} alt={pokemon.name} />
                <p>Height: {pokemon.height}</p>
                <p>Weight: {pokemon.weight}</p>
                <button onClick={onClose}>Закрыть</button>
            </div>
        </div>
    );
};

export default Modal;

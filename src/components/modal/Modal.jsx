import React from 'react';
import classes from './Modal.module.css';

const Modal = ({ pokemon, onClose }) => {
    if (!pokemon) return null;

    return (
        <div className={classes.modaloverlay}>
            <div className={classes.modalcontent}>
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

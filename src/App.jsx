import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import PokemonCard from "./components/PokemonCard.jsx";
import Modal from "./components/modal/Modal.jsx";

const schema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required')
});

const App = () => {
    const [submittedData, setSubmittedData] = useState(null);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const [pokemonData, setPokemonData] = useState([]);
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    useEffect(() => {
        // Функция для получения данных о покемонах из API
        const getPokemonData = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
                const data = await response.json();

                // Получение деталей для каждого покемона
                const detailedData = await Promise.all(
                    data.results.map(async (pokemon) => {
                        const res = await fetch(pokemon.url);
                        return res.json();
                    })
                );

                setPokemonData(detailedData);
            } catch (error) {
                console.error("Error fetching Pokémon data:", error);
            }
        };

        getPokemonData();
    }, []);

    const onSubmit = (data) => {
        setSubmittedData(data);
        setIsFormSubmitted(true);
    };

    const handleCardClick = (pokemon) => {
        setSelectedPokemon(pokemon);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedPokemon(null);
    };

    return (
        <div>
            {!isFormSubmitted ? (
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label>Name:</label>
                        <input {...register('name')} />
                        <p>{errors.name?.message}</p>
                    </div>
                    <div>
                        <label>Email:</label>
                        <input {...register('email')} />
                        <p>{errors.email?.message}</p>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input {...register('password')} type="password" />
                        <p>{errors.password?.message}</p>
                    </div>
                    <div>
                        <label>Confirm Password:</label>
                        <input {...register('confirmPassword')} type="password" />
                        <p>{errors.confirmPassword?.message}</p>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            ) : (
                <div>
                    <h2>Submitted Data:</h2>
                    <p>Name: {submittedData.name}</p>
                    <p>Email: {submittedData.email}</p>
                    <PokemonCard pockemon={pokemonData} onCardClick={handleCardClick} />
                    {isModalOpen && <Modal pokemon={selectedPokemon} onClose={closeModal} />}
                </div>
            )}
        </div>
    );
};

export default App;

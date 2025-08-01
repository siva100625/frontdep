import { useEffect, useState } from 'react';
import api from '../api';
import PetCard from '../components/PetCard';

const Home = () => {
  const [pets, setPets] = useState([]);

  const fetchPets = async () => {
    const res = await api.get('/pets');
    setPets(res.data);
  };

  useEffect(() => {
    fetchPets();
  }, []);

  const handleAdopt = async (id) => {
    const userEmail = prompt('Enter your email to adopt');

    if (!userEmail || !userEmail.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }

    try {
      await api.put(`/pets/adopt/${id}?userEmail=${encodeURIComponent(userEmail)}`);
      alert('Adoption email sent');
      fetchPets();
    } catch (error) {
      console.error(error);
      alert('Failed to send adoption request');
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        width: '100vw',
        backgroundColor: '#1e1e1e',
        padding: '2rem',
        color: 'white',
      }}
    >
      <h2 style={{ textAlign: 'center', marginBottom: '1rem' }}>Available Pets</h2>
      <div style={{ width: '100%', maxWidth: '600px' }}>
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onAdopt={handleAdopt} />
        ))}
      </div>
    </div>
  );
};

export default Home;
